import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizStart.css';

export default function QuizStart() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 'general', name: 'General Knowledge', icon: '🌍' },
    { id: 'history', name: 'History', icon: '📜' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'literature', name: 'Literature', icon: '📚' },
    { id: 'geography', name: 'Geography', icon: '🗺️' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'movies', name: 'Movies', icon: '🎬' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartQuiz = () => {
    if (selectedTopic) {
      navigate(`/quiz?topic=${selectedTopic}&difficulty=${selectedDifficulty}`);
    }
  };

  return (
    <div className="quiz-start-container">
      <div className="quiz-start-content">
        <h1 className="quiz-start-title">Choose Your Quiz</h1>
        <p className="quiz-start-subtitle">Select a topic and difficulty level to begin</p>

        <div className="quiz-search-container">
          <input
            type="text"
            placeholder="Search for a topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="quiz-search-input"
          />
        </div>

        <div className="quiz-start-section">
          <h2 className="quiz-start-section-title">Topic</h2>
          <div className="quiz-start-topics">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                className={`quiz-start-topic ${selectedTopic === topic.id ? 'selected' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <span className="quiz-start-topic-icon">{topic.icon}</span>
                <span className="quiz-start-topic-name">{topic.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-start-section">
          <h2 className="quiz-start-section-title">Difficulty</h2>
          <div className="quiz-start-difficulties">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                className={`quiz-start-difficulty ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
                onClick={() => setSelectedDifficulty(difficulty.id)}
              >
                <span className="quiz-start-difficulty-name">{difficulty.name}</span>
                <span className="quiz-start-difficulty-description">{difficulty.description}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="quiz-start-button"
          onClick={handleStartQuiz}
          disabled={!selectedTopic}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
