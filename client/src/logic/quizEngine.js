export const generateQuiz = (mode, config) => {
  const { maxNumber = 10, numQuestions = 10 } = config;
  const questions = [];
  const usedQuestions = new Set();
  const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  while (questions.length < numQuestions) {
    let question = {};
    if (mode === 'TABLES') {
      const a = getRand(2, maxNumber);
      const b = getRand(2, maxNumber);
      question = { text: `${a} × ${b}`, answer: a * b };
    } else if (mode === 'SQUARES') {
      const a = getRand(2, maxNumber);
      question = { text: `${a}²`, answer: a * a };
    } else if (mode === 'CUBES') {
      const a = getRand(2, Math.min(maxNumber, 20)); // Keep cubes manageable but difficult
      question = { text: `${a}³`, answer: a * a * a };
    } else if (mode === 'ADDITION') {
      const a = getRand(2, maxNumber * 5); // Increase range for addition
      const b = getRand(2, maxNumber * 5);
      question = { text: `${a} + ${b}`, answer: a + b };
    } else if (mode === 'SUBTRACTION') {
      const a = getRand(5, maxNumber * 5);
      const b = getRand(2, a - 2); // Ensure result is at least 2 to avoid trivial cases
      question = { text: `${a} - ${b}`, answer: a - b };
    } else if (mode === 'DIVISION') {
      const b = getRand(2, maxNumber);
      const result = getRand(2, maxNumber); // Match difficulty of tables
      const a = b * result;
      question = { text: `${a} ÷ ${b}`, answer: result };
    } else if (mode === 'BODMAS') {
      const p = getRand(0, 3);
      const a = getRand(2, 20), b = getRand(2, 20), c = getRand(2, 10);
      if (p === 0) question = { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c };
      else if (p === 1) question = { text: `${a} × ${b} + ${c}`, answer: a * b + c };
      else if (p === 2) question = { text: `${a} × ${b} - ${c}`, answer: a * b - c };
      else {
        // Complex Division BODMAS
        const divisor = getRand(2, 5);
        const quotient = getRand(2, 10);
        const dividend = divisor * quotient;
        const add = getRand(5, 20);
        question = { text: `${dividend} ÷ ${divisor} + ${add}`, answer: quotient + add };
      }
    }

    if (question.text && !usedQuestions.has(question.text)) {
      usedQuestions.add(question.text);
      questions.push({ id: questions.length, ...question, type: mode.toLowerCase() });
    }
    
    // Safety break to prevent infinite loops if possibilities are exhausted
    const maxPossibilities = 500; 
    if (usedQuestions.size >= maxPossibilities) break;
  }
  return questions;
};
