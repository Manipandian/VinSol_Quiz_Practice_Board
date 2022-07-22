import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import QuizInfoForm from '../../Components/QuizInfoForm/QuizInfoForm';
import QuizSection from '../QuizSection/QuizSection';
import {
  QUIZ_DEFAULT_INFO,
  SESSION_QUIZ_DATA,
  SESSION_QUIZ_INFO,
} from '../../Constants';
import { resetQuizData } from '../../helper';

const MainQuizeBoard = ({ quizCount }) => {
  const [quizInfo, setQuizInfo] = useState(() => {
    //To fetch data from session storage on page refresh
    const quizInfoSession = JSON.parse(
      sessionStorage.getItem(SESSION_QUIZ_INFO)
    );
    return quizInfoSession ? quizInfoSession : QUIZ_DEFAULT_INFO;
  });
  const [allQuizData, setAllQuizData] = useState(() => {
    //To fetch data from session storage on page refresh
    const quizDataFromSession = JSON.parse(
      sessionStorage.getItem(SESSION_QUIZ_DATA)
    );
    return quizDataFromSession ? quizDataFromSession : resetQuizData(quizCount);
  });

  //To update information like Max Range, No. of question and operations
  const setQuizeInfo = (value, field) => {
    const quizInfoUpdated = { ...quizInfo, [field]: value };
    setQuizInfo(quizInfoUpdated);
    sessionStorage.setItem(SESSION_QUIZ_INFO, JSON.stringify(quizInfoUpdated));
  };

  const resetQuizCallBack = () => {
    setAllQuizData(resetQuizData(quizCount));
    sessionStorage.removeItem(SESSION_QUIZ_DATA);
  };

  // To update quizdata with users provided answers
  const updateQuizData = (updatedQuizData, section) => {
    const allQuizDataCopy = [...allQuizData];
    allQuizDataCopy[section - 1] = updatedQuizData;
    setAllQuizData(allQuizDataCopy);
    sessionStorage.setItem(SESSION_QUIZ_DATA, JSON.stringify(allQuizDataCopy));
  };

  //To update cumulative score and info form disable state based on quiz inprogress
  const getScoreAndState = () => {
    let cumulativeScore = 0;
    let disableForm = false;
    allQuizData.forEach((quizData) => {
      if (!quizData.quizInProgress) {
        cumulativeScore = cumulativeScore + quizData.correctAnswersCount;
      } else {
        disableForm = true;
      }
    });
    return { cumulativeScore, disableForm };
  };
  const { cumulativeScore, disableForm } = getScoreAndState();

  return (
    <div>
      <header>
        <Box m={2} component="h2">
          Arithmatic Quiz Board
        </Box>
        <Box m={2} component="h3">
          Cumulative Score: {cumulativeScore}
        </Box>
        <QuizInfoForm
          quizInfo={quizInfo}
          setQuizeInfo={setQuizeInfo}
          disableForm={disableForm}
          resetQuizCallBack={resetQuizCallBack}
        />
      </header>
      <section>
        <Grid container spacing={1} mt={1}>
          {allQuizData.map((quizData, index) => {
            return (
              <Grid item xs={6} key={`${quizData.answersData}${index}`}>
                <Box sx={{ border: 1, p: 2 }} component="h3">{`Quiz Section: ${
                  index + 1
                }`}</Box>
                <QuizSection
                  section={index + 1}
                  quizInfo={quizInfo}
                  quizData={quizData}
                  updateQuizData={updateQuizData}
                />
              </Grid>
            );
          })}
        </Grid>
      </section>
    </div>
  );
};

export default MainQuizeBoard;
