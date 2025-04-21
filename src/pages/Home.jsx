import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import HistoryCard from '../components/HistoryCard';
import { fetchTopicContent } from '../services/api';
import './Home.css';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentSearch, searchHistory, addSearch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const result = await fetchTopicContent(topic);
      addSearch(topic, result);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (currentSearch) {
      navigate(`/quiz?topic=${encodeURIComponent(currentSearch.title)}&narrative=${encodeURIComponent(currentSearch.narrative)}`);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Knowledge Explorer</h1>
        <p>Discover fascinating information about any topic</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Search for any topic - science, history, technology, etc."
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
        
        {searchHistory.length > 0 && (
          <div className="recent-searches">
            <p>Recent searches:</p>
            <div className="tags">
              {searchHistory.map((search, index) => (
                <button 
                  key={index} 
                  className="tag"
                  onClick={() => setTopic(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {currentSearch && (
        <div className="results-section">
          <HistoryCard data={currentSearch} />
          <button 
            onClick={startQuiz}
            className="quiz-button"
            disabled={!currentSearch}
          >
            Test Your Knowledge
          </button>
        </div>
      )}
      
      {!currentSearch && !loading && (
        <div className="empty-state">
          <h2>Explore Knowledge</h2>
          <p>Try searching for events like "World War II", "Roman Empire", or "Industrial Revolution"</p>
        </div>
      )}
    </div>
  );
}