import { useState } from 'react';
import Question from '../Question/Question';
import QuizResult from '../../Components/QuizResult/QuizResult';
import QuizStartInfo from '../../Components/QuizStartInfo/QuizStartInfo';
import { createRandomQuestionData } from '../../helper';
import './QuizSection.css';

const QuizSection = ({ quizInfo, quizData, updateQuizData, section }) => {
  const [randomQuestion, setRandomQuestion] = useState(
    createRandomQuestionData(quizInfo)
  );

  const { questions } = quizInfo;
  const { quizInProgress, answersData, correctAnswersCount } = quizData;

  //To update user input and navigate to next question
  const answerCallBack = (answer) => {
    const quizDataCopy = { ...quizData };
    const updatedAnswers = [...answersData, answer];
    quizDataCopy.answersData = updatedAnswers;
    if (answer.userAnswer)
      quizDataCopy.correctAnswersCount = correctAnswersCount + 1;
    if (updatedAnswers.length === questions) {
      quizDataCopy.quizInProgress = false;
    }
    setRandomQuestion(createRandomQuestionData(quizInfo));
    updateQuizData(quizDataCopy, section);
  };

  const startQuizCallBack = () => {
    updateQuizData({ ...quizData, quizInProgress: true }, section);
  };

  return (
    <div className="quiz-section">
      {!quizInProgress ? (
        answersData.length === questions ? (
          <QuizResult
            answersData={answersData}
            correctAnswersCount={correctAnswersCount}
          />
        ) : (
          <QuizStartInfo
            startQuizCallBack={startQuizCallBack}
            quizInfo={quizInfo}
          />
        )
      ) : (
        <Question
          questionNumber={answersData.length + 1}
          quizInfo={quizInfo}
          answerCallBack={answerCallBack}
          correctAnswersCount={correctAnswersCount}
          randomQuestion={randomQuestion}
        />
      )}
    </div>
  );
};

export default QuizSection;
