import React, { useState, useEffect } from 'react';

const QuizzBox = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="MainCard" onClick={handleFlip}>
      <div className={`Centered-content ${isFlipped ? 'is-flipped' : ''}`}>
        <div className={`card-face card-front ${card.difficulty}`}>
          <p>{card.question}</p>
        </div>
        <div className={`card-face card-back ${card.difficulty}`}>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizzBox;
