import { QUIZ_DEFAULT_DATA } from './Constants';

// Create random numbers and operator for quiz
export const createRandomQuestionData = (quizInfo) => {
  const { range, operators } = quizInfo;
  const number1 = Math.ceil(Math.random() * range);
  const number2 = Math.ceil(Math.random() * range);
  const randomOperator =
    operators[Math.ceil(Math.random() * operators.length) - 1];
  return { number1, number2, randomOperator };
};

//To update quiz sections with default data
export const resetQuizData = (count) => {
  const defaultData = [];
  for (let i = 0; i < count; i++) {
    defaultData.push({ ...QUIZ_DEFAULT_DATA });
  }
  return defaultData;
};
