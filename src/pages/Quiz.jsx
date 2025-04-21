import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { generateQuizQuestions } from '../services/api';
import './Quiz.css';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get('topic') || 'general knowledge';
  const difficulty = searchParams.get('difficulty') || 'medium';
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const quizQuestions = await generateQuizQuestions(topic, difficulty);
        
        if (!quizQuestions || quizQuestions.length === 0) {
          throw new Error('No questions available for this topic');
        }
        
        setQuestions(quizQuestions);
        
        // Set a default background image based on the topic
        const defaultImages = {
          'general knowledge': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
          'history': 'https://images.unsplash.com/photo-1461360228754-6e81b4783176',
          'science': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
          'technology': 'https://images.unsplash.com/photo-1518770660439-463619eafdbd',
          'art': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
          'literature': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
          'geography': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce',
          'music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
          'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
          'movies': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'
        };
        
        // Try to match the topic with a default image
        const matchedTopic = Object.keys(defaultImages).find(key => 
          topic.toLowerCase().includes(key.toLowerCase())
        );
        
        setBackgroundImage(matchedTopic ? defaultImages[matchedTopic] : defaultImages['general knowledge']);
        
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError(err.message || 'Failed to load quiz questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, [topic, difficulty]);

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption !== null) return;
    
    const isCorrect = optionIndex === questions[currentIndex].answer;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleTryAgain = () => {
    navigate('/quiz-start');
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="spinner"></div>
        <p>Loading your quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-error">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = '';
    let emoji = '🎉';
    
    if (percentage >= 90) {
      resultMessage = 'Outstanding! You\'re a master of this topic!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      resultMessage = 'Great job! You really know your stuff!';
      emoji = '🌟';
    } else if (percentage >= 50) {
      resultMessage = 'Good effort! Keep learning and improving!';
      emoji = '👍';
    } else {
      resultMessage = 'Keep practicing! You\'ll get better with time.';
      emoji = '📚';
    }
    
    return (
      <div className="quiz-result">
        <h2>Quiz Complete! {emoji}</h2>
        <p>Your score: {score}/{questions.length}</p>
        <p>Percentage: {percentage}%</p>
        <p>{resultMessage}</p>
        <button onClick={handleTryAgain}>Try Another Quiz</button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="quiz-error">
        <h3>No questions available</h3>
        <p>Please try a different topic or difficulty level.</p>
        <button onClick={handleTryAgain}>Go Back</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;
  
  return (
    <>
      {backgroundImage && (
        <div 
          className="quiz-background" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="quiz-container">
        <div className="quiz-header">
          <span>Question {currentIndex + 1}/{questions.length}</span>
          <span>Score: {score}</span>
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <h2 className="question">{currentQuestion.question}</h2>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            let className = 'option';
            if (selectedOption !== null) {
              if (index === currentQuestion.answer) {
                className += ' correct';
              } else if (index === selectedOption && index !== currentQuestion.answer) {
                className += ' incorrect';
              }
            }
            
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        {showFeedback && selectedOption !== null && (
          <div className="explanation">
            {selectedOption === currentQuestion.answer ? (
              <p className="correct-text">Correct! Well done! 🎉</p>
            ) : (
              <p className="incorrect-text">
                Not quite right. The correct answer is: {currentQuestion.options[currentQuestion.answer]}
              </p>
            )}
          </div>
        )}
        
        <div className="quiz-navigation">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button onClick={handleNext}>
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
}
