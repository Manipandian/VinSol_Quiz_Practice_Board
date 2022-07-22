export const OPERATORS = {
  Add: '+',
  Subtract: '-',
  Divide: '/',
  Multiply: '*',
};

export const QUESTION_INTERVAL_TIME = 20;

export const QUIZ_DEFAULT_INFO = {
  questions: 20,
  range: 10,
  operators: Object.keys(OPERATORS),
};

export const QUIZ_DEFAULT_DATA = {
  quizInProgress: false,
  answersData: [],
  correctAnswersCount: 0,
};

export const SESSION_QUIZ_INFO = 'quizinfo';
export const SESSION_QUIZ_DATA = 'quizdata';
