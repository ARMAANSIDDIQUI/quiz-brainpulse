export const generateQuiz = (mode, config) => {
  // Enforce strict adherence to request values
  const limits = {
    ADDITION: 100,
    SUBTRACTION: 100,
    TABLES: 10,
    SQUARES: 10,
    CUBES: 10,
    DIVISION: 100,
    BODMAS: 100
  };

  const n = config.maxNumber || limits[mode] || 10;
  const { numQuestions = 10 } = config;
  const questions = [];
  const usedQuestions = new Set();
  const getRand = (min, max) => {
    if (min > max) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  while (questions.length < numQuestions) {
    let question = {};
    const questionNum = questions.length + 1;
    const isHard = questionNum % 3 === 0;

    // Use n as the strict cap. 
    // For non-hard questions, we use a smaller range within the same limit.
    const currentMax = isHard ? n : Math.max(2, Math.floor(n * 0.6));

    if (mode === 'TABLES') {
      const a = getRand(isHard ? Math.floor(n/2) : 2, currentMax);
      const b = getRand(isHard ? Math.floor(n/2) : 2, currentMax);
      const sorted = [a, b].sort((x, y) => x - y);
      const key = `${sorted[0]} × ${sorted[1]}`;
      question = { text: `${a} × ${b}`, answer: a * b, key };
    } else if (mode === 'SQUARES') {
      const a = getRand(isHard ? Math.floor(n/2) : 2, currentMax);
      question = { text: `${a}²`, answer: a * a };
    } else if (mode === 'CUBES') {
      const a = getRand(isHard ? Math.floor(n/2) : 2, currentMax);
      question = { text: `${a}³`, answer: a * a * a };
    } else if (mode === 'ADDITION') {
      const a = getRand(2, currentMax);
      const b = getRand(2, currentMax);
      const sorted = [a, b].sort((x, y) => x - y);
      const key = `${sorted[0]} + ${sorted[1]}`;
      question = { text: `${a} + ${b}`, answer: a + b, key };
    } else if (mode === 'SUBTRACTION') {
      const a = getRand(Math.floor(currentMax/2), currentMax);
      const b = getRand(2, a);
      question = { text: `${a} - ${b}`, answer: a - b };
    } else if (mode === 'DIVISION') {
      // dividend up to divisor * maxQuotient
      const divisor = getRand(2, Math.max(2, Math.min(10, n)));
      const maxQuotient = Math.max(2, Math.floor(n / divisor));
      const quotient = getRand(2, isHard ? maxQuotient : Math.max(2, Math.ceil(maxQuotient * 0.6)));
      const dividend = divisor * quotient;
      question = { text: `${dividend} ÷ ${divisor}`, answer: quotient };
    } else if (mode === 'BODMAS') {
      const p = getRand(0, 3);
      const a = getRand(2, isHard ? Math.min(30, n) : Math.min(10, n));
      const b = getRand(2, isHard ? Math.min(20, n) : Math.min(10, n));
      const c = getRand(2, isHard ? Math.min(20, n) : Math.min(10, n));
      
      if (p === 0) question = { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c };
      else if (p === 1) question = { text: `${a} × ${b} + ${c}`, answer: a * b + c };
      else if (p === 2) question = { text: `${a} × ${b} - ${c}`, answer: a * b - c };
      else {
        const divisor = getRand(2, Math.max(2, Math.min(10, n)));
        const quotient = getRand(2, Math.max(2, Math.min(10, n)));
        const dividend = divisor * quotient;
        const add = getRand(2, isHard ? Math.min(50, n) : Math.min(20, n));
        question = { text: `${dividend} ÷ ${divisor} + ${add}`, answer: quotient + add };
      }
    }

    const hashKey = question.key || question.text;
    if (question.text && !usedQuestions.has(hashKey)) {
      usedQuestions.add(hashKey);
      questions.push({ id: questions.length, ...question, type: mode.toLowerCase() });
    }
    
    if (usedQuestions.size >= 1000) break;
  }
  return questions;
};

