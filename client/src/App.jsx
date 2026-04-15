import React, { useState, useEffect } from 'react';
import './index.css';
import { generateQuiz } from './logic/quizEngine';

// Components
import Home from './components/Home';
import Settings from './components/Settings';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const [view, setView] = useState('HOME');
  const [mode, setMode] = useState(null); 
  const [config, setConfig] = useState({
    maxNumber: 10,
    numQuestions: 10,
    secondsPerQuestion: 10
  });
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(null);

  const startQuiz = (finalConfig) => {
    setConfig(finalConfig);
    const generated = generateQuiz(mode, finalConfig);
    setQuestions(generated);
    setView('QUIZ');
  };

  const finishQuiz = (score, stats) => {
    setResults({ score, stats, config });
    setView('RESULTS');
  };

  const reset = () => {
    setView('HOME');
    setMode(null);
    setQuestions([]);
    setResults(null);
  };

  return (
    <div className="app-container">
      {view === 'HOME' && <Home setMode={setMode} setView={setView} />}
      {view === 'SETTINGS' && (
        <Settings 
          mode={mode} 
          config={config} 
          setConfig={setConfig} 
          onStart={startQuiz}
          onBack={() => setView('HOME')} 
        />
      )}
      {view === 'QUIZ' && (
        <Quiz 
          questions={questions} 
          timerLimit={config.secondsPerQuestion} 
          onFinish={finishQuiz} 
        />
      )}
      {view === 'RESULTS' && <Results results={results} onReset={reset} />}

      <footer style={{ 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        width: '100%', 
        textAlign: 'center', 
        color: 'var(--text-dim)', 
        fontSize: '0.8rem',
        letterSpacing: '0.1rem'
      }}>
        By <a href="https://armaansiddiqui.online" target="_blank" rel="noopener noreferrer" style={{ 
          color: 'var(--primary)', 
          textDecoration: 'none', 
          fontWeight: '600' 
        }}>armaansiddiqui.online</a>
      </footer>
    </div>
  );
}

export default App;
