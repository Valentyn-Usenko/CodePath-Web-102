import React, { useState } from 'react';
import QuizzBox from './quiz_app.jsx';
import './App.css';

const cards = [
  { 
    question: "What is the difference between a pointer and a reference in C++?", 
    answer: "Pointers can be reassigned and can be null; references must always refer to an object and cannot be reseated.", 
    difficulty: "hard" 
  },
  { 
    question: "What does RAII stand for in C++?", 
    answer: "Resource Acquisition Is Initialization – managing resources via object lifetime.", 
    difficulty: "medium" 
  },
  { 
    question: "What is the output of: int x = 5; cout << ++x; ?", 
    answer: "6 (because pre-increment increments before printing)", 
    difficulty: "easy" 
  },
  { 
    question: "What does <!DOCTYPE html> do?", 
    answer: "It defines the document type and HTML version, telling the browser to use standards mode.", 
    difficulty: "easy" 
  },
  { 
    question: "Which HTML element is used to embed JavaScript code?", 
    answer: "<script> element", 
    difficulty: "easy" 
  },
  { 
    question: "What is the difference between <div> and <span>?", 
    answer: "<div> is block-level, <span> is inline-level.", 
    difficulty: "medium" 
  },
  { 
    question: "What does 'position: absolute' mean in CSS?", 
    answer: "The element is positioned relative to the nearest positioned ancestor (non-static).", 
    difficulty: "medium" 
  },
  { 
    question: "What is the difference between relative, absolute, fixed, and sticky positioning?", 
    answer: "Relative: relative to itself; Absolute: relative to positioned ancestor; Fixed: relative to viewport; Sticky: toggles between relative and fixed.", 
    difficulty: "hard" 
  },
  { 
    question: "What is the difference between '==' and '===' in JavaScript?", 
    answer: "'==' checks value with type coercion; '===' checks value and type without coercion.", 
    difficulty: "easy" 
  },
  { 
    question: "Explain event bubbling in JavaScript.", 
    answer: "When an event triggers, it starts at the target and bubbles up through ancestors unless stopped.", 
    difficulty: "medium" 
  },
  { 
    question: "What is a closure in JavaScript?", 
    answer: "A closure is a function that retains access to its lexical scope, even after the outer function has returned.", 
    difficulty: "hard" 
  },
];


const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="app-container">
      <QuizzBox card={cards[currentIndex]} />



      <div className="arrow-container">
        <button className="arrow-btn" onClick={prevCard}>&larr;</button>
        <button className="arrow-btn" onClick={nextCard}>&rarr;</button>
      </div>
    </div>
  );
};

export default App;
