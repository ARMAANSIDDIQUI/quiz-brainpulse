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
    </div>
  );
}

export default App;
