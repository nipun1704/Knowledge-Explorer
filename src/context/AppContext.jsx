import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Search history state
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Current search data state
  const [currentSearch, setCurrentSearch] = useState(null);

  // Selected topic state
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // User progress state
  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedQuizzes: [],
      topicProgress: {},
      totalScore: 0,
      quizzesTaken: 0
    };
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [userProgress, searchHistory]);

  // Add to search history
  const addSearch = (topic, data) => {
    setCurrentSearch(data);
    setSearchHistory(prev => 
      [topic, ...prev.filter(t => t !== topic)].slice(0, 5)
    );
  };

  // Update user progress after completing a quiz
  const updateQuizProgress = (topic, score) => {
    setUserProgress(prev => {
      const newProgress = {
        ...prev,
        completedQuizzes: [
          ...prev.completedQuizzes,
          { topic, score, date: new Date().toISOString() }
        ],
        topicProgress: {
          ...prev.topicProgress,
          [topic]: {
            quizzesTaken: (prev.topicProgress[topic]?.quizzesTaken || 0) + 1,
            lastScore: score,
            highestScore: Math.max(score, prev.topicProgress[topic]?.highestScore || 0)
          }
        },
        totalScore: prev.totalScore + score,
        quizzesTaken: prev.quizzesTaken + 1
      };
      return newProgress;
    });
  };

  // Track topic learning progress
  const updateTopicProgress = (topic) => {
    setUserProgress(prev => ({
      ...prev,
      topicProgress: {
        ...prev.topicProgress,
        [topic]: {
          ...prev.topicProgress[topic],
          lastVisited: new Date().toISOString(),
          visitCount: (prev.topicProgress[topic]?.visitCount || 0) + 1
        }
      }
    }));
  };

  const value = {
    searchHistory,
    currentSearch,
    addSearch,
    selectedTopic,
    setSelectedTopic,
    userProgress,
    updateQuizProgress,
    updateTopicProgress,
    averageScore: userProgress.quizzesTaken 
      ? Math.round(userProgress.totalScore / userProgress.quizzesTaken) 
      : 0
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 