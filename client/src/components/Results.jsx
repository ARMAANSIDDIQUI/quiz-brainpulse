import React from 'react';

const Results = ({ results, onReset }) => {
  const { score, stats } = results;
  const percentage = Math.round((score / stats.length) * 100);

  return (
    <div className="results-container" style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', boxShadow: '0 0 50px rgba(0, 242, 255, 0.1)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Performance Review</h2>
        <div style={{ fontSize: '4.5rem', fontWeight: '800', color: 'var(--primary)', lineHeight: 1 }}>
          {percentage}%
        </div>
        <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>Successfully solved {score} of {stats.length} challenges</p>
        <button className="btn" style={{ marginTop: '2rem', maxWidth: '300px' }} onClick={onReset}>TRY AGAIN</button>
      </div>

      <div className="stats-list" style={{ display: 'grid', gap: '0.8rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dim)', paddingLeft: '0.5rem' }}>Detailed Breakdown</h3>
        {stats.map((s, idx) => (
          <div key={idx} className="glass" style={{ 
            padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderColor: s.isCorrect ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 0, 122, 0.2)', transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{s.question}</div>
            <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
              <div style={{ color: s.isCorrect ? '#00ffa3' : '#ff007a' }}>{s.userAnswer}</div>
              <div style={{ color: 'var(--text-dim)' }}>Correct: {s.correctAnswer}</div>
            </div>
            <div style={{ marginLeft: '1rem', fontSize: '1.3rem' }}>{s.isCorrect ? '✅' : '❌'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
