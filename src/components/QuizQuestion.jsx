import { useState } from 'react';

const QuizQuestion = ({ question, onNextQuestion, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return; // Prevent selecting after feedback is shown
    setSelectedAnswer(answer);
    setShowFeedback(true);
    const isCorrect = answer.id === question.correctAnswer;
    onComplete(isCorrect);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    onNextQuestion();
  };

  const getAnswerButtonClass = (answer) => {
    if (!showFeedback) {
      return selectedAnswer?.id === answer.id ? 'selected' : '';
    }
    if (answer.id === question.correctAnswer) {
      return 'correct';
    }
    if (selectedAnswer?.id === answer.id && answer.id !== question.correctAnswer) {
      return 'incorrect';
    }
    return '';
  };

  return (
    <div className="quiz-question">
      <h2 className="question">{question.question}</h2>
      <div className="answers">
        {question.options.map((answer) => (
          <button
            key={answer.id}
            className={`answer-button ${getAnswerButtonClass(answer)}`}
            onClick={() => handleAnswerSelect(answer)}
            disabled={showFeedback}
          >
            {answer.text}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`feedback ${selectedAnswer?.id === question.correctAnswer ? 'correct' : 'incorrect'}`}>
          <p>
            {selectedAnswer?.id === question.correctAnswer
              ? '✓ Correct!'
              : `✗ Incorrect. The correct answer is: ${question.options.find(opt => opt.id === question.correctAnswer)?.text}`}
          </p>
          {question.explanation && <p className="explanation">{question.explanation}</p>}
          <button className="next-button" onClick={handleNext}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion; 