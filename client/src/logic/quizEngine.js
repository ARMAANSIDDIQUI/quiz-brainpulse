export const generateQuiz = (mode, config) => {
  const { maxNumber = 10, numQuestions = 10 } = config;
  const questions = [];
  const usedQuestions = new Set();
  const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  while (questions.length < numQuestions) {
    let question = {};
    const questionNum = questions.length + 1;
    // Every 3rd question is "Hard"
    const isHard = questionNum % 3 === 0;
    
    // Adjust multiplier for difficulty
    const mult = isHard ? 2 : 1; 
    const currentMax = maxNumber * mult;

    if (mode === 'TABLES') {
      const a = getRand(2, currentMax);
      const b = getRand(2, currentMax);
      // Normalize for commutativity (a+b = b+a)
      const sorted = [a, b].sort((x, y) => x - y);
      const key = `${sorted[0]} × ${sorted[1]}`;
      question = { text: `${a} × ${b}`, answer: a * b, key };
    } else if (mode === 'SQUARES') {
      const a = getRand(isHard ? Math.floor(maxNumber / 2) : 2, currentMax);
      question = { text: `${a}²`, answer: a * a };
    } else if (mode === 'CUBES') {
      const a = getRand(isHard ? 10 : 2, isHard ? 25 : 12);
      question = { text: `${a}³`, answer: a * a * a };
    } else if (mode === 'ADDITION') {
      const a = getRand(2, currentMax * 5);
      const b = getRand(2, currentMax * 5);
      const sorted = [a, b].sort((x, y) => x - y);
      const key = `${sorted[0]} + ${sorted[1]}`;
      question = { text: `${a} + ${b}`, answer: a + b, key };
    } else if (mode === 'SUBTRACTION') {
      const a = getRand(currentMax , currentMax * 5);
      const b = getRand(2, a - (isHard ? 5 : 2));
      question = { text: `${a} - ${b}`, answer: a - b };
    } else if (mode === 'DIVISION') {
      const b = getRand(2, currentMax);
      const result = getRand(isHard ? Math.floor(maxNumber / 2) : 2, currentMax);
      const a = b * result;
      question = { text: `${a} ÷ ${b}`, answer: result };
    } else if (mode === 'BODMAS') {
      const p = getRand(0, 3);
      const a = getRand(5, isHard ? 40 : 15), b = getRand(5, isHard ? 40 : 15), c = getRand(2, isHard ? 20 : 10);
      if (p === 0) question = { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c };
      else if (p === 1) question = { text: `${a} × ${b} + ${c}`, answer: a * b + c };
      else if (p === 2) question = { text: `${a} × ${b} - ${c}`, answer: a * b - c };
      else {
        const divisor = getRand(2, isHard ? 10 : 5);
        const quotient = getRand(5, isHard ? 20 : 10);
        const dividend = divisor * quotient;
        const add = getRand(10, isHard ? 50 : 20);
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
