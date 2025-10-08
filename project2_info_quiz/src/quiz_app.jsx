import React, { useState, useEffect } from 'react';

const QuizzBox = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setIsFlipped(false);
    setUserAnswer('');
    setIsCorrect(null);
  }, [card]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const checkAnswer = () => {
    const correct =
      userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    setIsCorrect(correct);
  };

  return (
    <div className="MainCard">
      {}
      <div
        className={`Centered-content ${isFlipped ? 'is-flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className={`card-face card-front ${card.difficulty}`}>
          <p>{card.question}</p>
        </div>
        <div className={`card-face card-back ${card.difficulty}`}>
          <p>{card.answer}</p>
        </div>
      </div>

      {}
      <div className="answer-section">
        <input
          type="text"
          placeholder="Type your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className={`answer-input ${
            isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''
          }`}
        />
        <button className="check-btn" onClick={checkAnswer}>
          Check Answer
        </button>
      </div>
    </div>
  );
};

export default QuizzBox;
