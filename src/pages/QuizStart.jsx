import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizStart.css';

export default function QuizStart() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set a default background image using a proper public URL
    setBackgroundImage('/quiz.jpg');
  }, []);

  const handleStartQuiz = () => {
    if (!topic.trim()) return;
    navigate(`/quiz?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`);
  };

  return (
    <>
      {backgroundImage && (
        <div 
          className="quiz-start-background" 
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '100% 97%' }}
        />
      )}
      <div className="quiz-start-container">
        <h1>Start New Quiz</h1>
        <div className="quiz-form">
          <div className="form-group">
            <label>Topic:</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., World War II, Ancient Rome)"
              required
            />
          </div>
          <div className="form-group">
            <label>Difficulty:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button 
            onClick={handleStartQuiz}
            disabled={!topic.trim()}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
}
