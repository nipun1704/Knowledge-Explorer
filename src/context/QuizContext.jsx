import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = (quizQuestions) => {
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setError(null);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setError(null);
  };

  const value = {
    questions,
    currentQuestionIndex,
    score,
    loading,
    error,
    quizCompleted,
    setLoading,
    setError,
    startQuiz,
    handleAnswer,
    nextQuestion,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext; 