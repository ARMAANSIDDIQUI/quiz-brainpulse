import React, { useState, useEffect, useRef } from 'react';

const Quiz = ({ questions, timerLimit, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(timerLimit);
  const inputRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Set the input to the previous answer if it exists
      const saved = userAnswers[currentIndex];
      const val = (saved && saved !== 'TIMEOUT') ? saved : '';
      inputRef.current.value = val;
    }
    
    setTimeLeft(timerLimit); // Reset timer for the question (per user request for traversion)

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          saveAndNavigate(1, 'TIMEOUT');
          return timerLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const saveAndNavigate = (dir, val = inputRef.current.value) => {
    // Save current answer
    const newAnswers = [...userAnswers];
    // Don't overwrite if it was a timeout, unless we have a new value
    if (val !== null) newAnswers[currentIndex] = val;
    setUserAnswers(newAnswers);

    const nextIndex = currentIndex + dir;

    if (nextIndex >= 0 && nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else if (nextIndex >= questions.length) {
      // Calculate final results
      const finalStats = questions.map((q, idx) => {
        const uAns = newAnswers[idx];
        const isTimeout = uAns === 'TIMEOUT';
        const isCorrect = !isTimeout && parseInt(uAns) === q.answer;
        return {
          question: q.text,
          correctAnswer: q.answer,
          userAnswer: isTimeout ? 'TIMEOUT' : (uAns || 'NO ANSWER'),
          isCorrect
        };
      });
      const finalScore = finalStats.filter(s => s.isCorrect).length;
      onFinish(finalScore, finalStats);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveAndNavigate(1);
  };

  return (
    <div className="quiz-container" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        <span>Question {currentIndex + 1}/{questions.length}</span>
        <span style={{ color: 'var(--primary)' }}>Ready to solve?</span>
      </div>

      <div className="glass-progress" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', width: `${((currentIndex + 1) / questions.length) * 100}%`, 
          background: 'var(--primary)', transition: 'width 0.3s' 
        }} />
      </div>

      <div className="glass quiz-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div className={`timer-ring ${timeLeft <= 3 ? 'timer-stress' : ''}`} style={{
          position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', fontWeight: 'bold'
        }}>
          {timeLeft}s
        </div>

        <div className="question-text" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', wordBreak: 'break-word' }}>
          {currentQuestion.text}
        </div>

        <input 
          ref={inputRef} type="number"
          onKeyDown={handleKeyDown} placeholder="?"
          autoFocus
          style={{
            background: 'transparent', border: 'none', borderBottom: '2px solid var(--primary)',
            fontSize: '2.5rem', textAlign: 'center', color: 'white', width: '100%', marginBottom: '2rem', outline: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn" 
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }} 
            onClick={() => saveAndNavigate(-1)}
            disabled={currentIndex === 0}
          >
            PREV
          </button>
          <button 
            className="btn" 
            style={{ flex: 2 }} 
            onClick={() => saveAndNavigate(1)}
          >
            {currentIndex === questions.length - 1 ? 'FINISH QUIZ' : 'NEXT'}
          </button>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>Tip: You can use ENTER key for next question</p>
    </div>
  );
};

export default Quiz;
