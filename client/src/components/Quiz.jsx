import React, { useState, useEffect, useRef } from 'react';

const Quiz = ({ questions, timerLimit, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(timerLimit);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState([]);
  const inputRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext(null, true);
          return timerLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = (finalAnswer = userAnswer, isTimeout = false) => {
    const isCorrect = !isTimeout && parseInt(finalAnswer) === currentQuestion.answer;
    
    if (isCorrect) setScore(s => s + 1);
    
    const newStat = {
      question: currentQuestion.text,
      correctAnswer: currentQuestion.answer,
      userAnswer: isTimeout ? 'TIMEOUT' : finalAnswer,
      isCorrect
    };

    if (currentIndex + 1 < questions.length) {
      setStats([...stats, newStat]);
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setTimeLeft(timerLimit);
    } else {
      onFinish(isCorrect ? score + 1 : score, [...stats, newStat]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <div className="quiz-container" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        <span>Question {currentIndex + 1}/{questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="glass-progress" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(currentIndex / questions.length) * 100}%`, background: 'var(--primary)', transition: 'width 0.3s' }} />
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
          ref={inputRef} type="number" value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown} placeholder="?"
          style={{
            background: 'transparent', border: 'none', borderBottom: '2px solid var(--primary)',
            fontSize: '2.5rem', textAlign: 'center', color: 'white', width: '100%', marginBottom: '2rem', outline: 'none'
          }}
        />

        <button className="btn" onClick={() => handleNext()}>SUBMIT ANSWER</button>
      </div>
    </div>
  );
};

export default Quiz;
