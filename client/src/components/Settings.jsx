import React, { useState } from 'react';

const Settings = ({ mode, config, onStart, onBack }) => {
  const getDefaultMax = () => {
    switch(mode) {
      case 'ADDITION':
      case 'SUBTRACTION':
      case 'DIVISION':
      case 'BODMAS': return 100;
      case 'TABLES':
      case 'SQUARES':
      case 'CUBES': return 10;
      default: return 10;
    }
  };

  const getDefaultSeconds = () => {
    switch(mode) {
      case 'TABLES': return 10;
      case 'SQUARES': return 15;
      case 'CUBES': return 25;
      case 'ADDITION':
      case 'SUBTRACTION':
      case 'DIVISION': return 15;
      case 'BODMAS': return 20;
      default: return 10;
    }
  };

  const [localConfig, setLocalConfig] = useState({
    maxNumber: getDefaultMax(),
    numQuestions: mode === 'TABLES' ? 20 : 10,
    secondsPerQuestion: getDefaultSeconds()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className="glass settings-card" style={{ padding: '2.5rem', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Configure {mode}</h2>
      
      <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Max Table / Number (n) - Fixed</label>
        <input type="number" name="maxNumber" value={localConfig.maxNumber} readOnly className="glass-input" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Questions</label>
        <input type="number" name="numQuestions" value={localConfig.numQuestions} onChange={handleChange} className="glass-input" />
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Seconds per question</label>
        <input type="number" name="secondsPerQuestion" value={localConfig.secondsPerQuestion} onChange={handleChange} className="glass-input" />
      </div>


      <div style={{ display: 'flex', gap: '0.8rem' }}>
        <button className="btn" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', flex: 1 }} onClick={onBack}>BACK</button>
        <button className="btn" style={{ flex: 2 }} onClick={() => onStart(localConfig)}>START ENGINE</button>
      </div>

      <style>{`.glass-input { width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); border-radius: 12px; color: white; font-size: 1.1rem; outline: none; transition: border-color 0.3s; }`}</style>
    </div>
  );
};

export default Settings;
