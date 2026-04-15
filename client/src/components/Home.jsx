import React from 'react';

const Home = ({ setMode, setView }) => {
  const modes = [
    { id: 'TABLES', title: 'Multiplication', icon: '×', desc: 'Master the tables' },
    { id: 'SQUARES', title: 'Squares', icon: 'x²', desc: 'Exponential speed' },
    { id: 'CUBES', title: 'Cubes', icon: 'x³', desc: 'Volume of knowledge' },
    { id: 'ADDITION', title: 'Addition', icon: '+', desc: 'Summation power' },
    { id: 'SUBTRACTION', title: 'Subtraction', icon: '-', desc: 'Differential logic' },
    { id: 'DIVISION', title: 'Division', icon: '÷', desc: 'Fractional speed' },
    { id: 'BODMAS', title: 'BODMAS', icon: '()', desc: 'Mixed Operations' },
  ];

  const handleSelect = (id) => {
    setMode(id);
    setView('SETTINGS');
  };

  return (
    <div className="home-container" style={{ textAlign: 'center', width: '100%' }}>
      <header style={{ marginBottom: '3rem' }}>
        <img src="/logo.png" alt="BrainPulse Logo" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 0 40px rgba(0, 242, 255, 0.3)' }} />
        <h1 className="glow-text">BrainPulse</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Train your mind for quantum speed</p>
      </header>

      <div className="modes-grid" style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', width: '100%', maxWidth: '1000px', margin: '0 auto' 
      }}>
        {modes.map(m => (
          <div key={m.id} className="glass mode-card" onClick={() => handleSelect(m.id)}
            style={{ padding: '2rem', cursor: 'pointer', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{m.icon}</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{m.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{m.desc}</p>
          </div>
        ))}
      </div>

      <style>{`.mode-card:hover { transform: translateY(-5px); border-color: var(--primary); background: rgba(0, 242, 255, 0.05); }`}</style>
    </div>
  );
};

export default Home;
