import React, { useState, useEffect, useRef } from 'react';

const Quiz = ({ questions, timerLimit, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
  const [remainingTimes, setRemainingTimes] = useState(new Array(questions.length).fill(timerLimit));
  const [timeLeft, setTimeLeft] = useState(timerLimit);
  const inputRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    // Load state for new question
    const savedTime = remainingTimes[currentIndex];
    setTimeLeft(savedTime);
    
    if (inputRef.current) {
      inputRef.current.focus();
      const savedAns = userAnswers[currentIndex];
      inputRef.current.value = (savedAns && savedAns !== 'TIMEOUT') ? savedAns : '';
      
      // Disable input if time has already run out for this question
      inputRef.current.disabled = savedTime <= 0;
    }

    if (savedTime > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            saveAndNavigate(1, 'TIMEOUT', 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  const saveAndNavigate = (dir, val = inputRef.current.value, finalTime = null) => {
    // 1. Sync current time and answer before moving
    const newAnswers = [...userAnswers];
    const newTimes = [...remainingTimes];
    
    // Save current answer (don't overwrite 'TIMEOUT' unless we have a manual entry)
    if (val !== null) newAnswers[currentIndex] = val;
    
    // Save current time
    newTimes[currentIndex] = finalTime !== null ? finalTime : timeLeft;
    
    setUserAnswers(newAnswers);
    setRemainingTimes(newTimes);

    // 2. Determine target
    const nextIndex = currentIndex + dir;

    if (nextIndex >= 0 && nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else if (nextIndex >= questions.length) {
      // Calculate final results
      const finalStats = questions.map((q, idx) => {
        const uAns = newAnswers[idx];
        const rTime = newTimes[idx];
        const isTimeout = uAns === 'TIMEOUT' || (rTime <= 0 && !uAns);
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
        <span style={{ color: timeLeft <= 3 ? 'var(--accent)' : 'var(--primary)' }}>
          {timeLeft <= 0 ? 'TIME EXPIRED' : 'SOLVE NOW'}
        </span>
      </div>

      <div className="glass-progress" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', width: `${((currentIndex + 1) / questions.length) * 100}%`, 
          background: 'var(--primary)', transition: 'width 0.3s' 
        }} />
      </div>

      <div className="glass quiz-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div className={`timer-ring ${timeLeft <= 3 && timeLeft > 0 ? 'timer-stress' : ''}`} style={{
          position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', fontWeight: 'bold',
          color: timeLeft <= 0 ? 'var(--text-dim)' : 'inherit'
        }}>
          {timeLeft}s
        </div>

        <div className="question-text" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', wordBreak: 'break-word', opacity: timeLeft <= 0 ? 0.5 : 1 }}>
          {currentQuestion.text}
        </div>

        <input 
          ref={inputRef} type="number"
          onKeyDown={handleKeyDown} placeholder="?"
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
    </div>
  );
};

export default Quiz;
