import { Grid, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { OPERATORS, QUESTION_INTERVAL_TIME } from '../../Constants';

const Question = ({
  questionNumber,
  quizInfo,
  answerCallBack,
  correctAnswersCount,
  randomQuestion,
}) => {
  const [userInput, setUserInput] = useState('');
  const [questionTimeValue, setQuestionTimeValue] = useState(
    QUESTION_INTERVAL_TIME
  );
  const timeCallBackRef = useRef();
  const { number1, number2, randomOperator } = randomQuestion;

  const updateUserInput = (e) => setUserInput(e.target.value);

  const timerCallBack = () => {
    console.log(questionTimeValue);
    setQuestionTimeValue(questionTimeValue - 1);
    if (questionTimeValue - 1 === 0) {
      submitAnswer();
    }
  };

  //To update set interval call back on rerender
  useEffect(() => {
    timeCallBackRef.current = timerCallBack;
  });

  useEffect(() => {
    function tick() {
      timeCallBackRef.current();
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const submitAnswer = () => {
    const correctAnswer = Math.round(
      Function('return ' + number1 + OPERATORS[randomOperator] + number2)()
    );
    const userAnswer = Math.round(Number(userInput)) === correctAnswer;
    setQuestionTimeValue(QUESTION_INTERVAL_TIME);
    setUserInput('');
    answerCallBack({
      ...randomQuestion,
      correctAnswer,
      userAnswer,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      mr={1}
      ml={1}
      sx={{ width: 1, height: '100%' }}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Grid container justifyContent="center">
        <Grid item xs={3}>
          <Box m={2} component="h2">
            {`${questionTimeValue} s`}
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around">
        <Grid item>
          <div className="question-text">{`${questionNumber} . `}</div>
        </Grid>
        <Grid item>
          <div className="question-text">{`${randomOperator} number ${number1} with ${number2} is equals to`}</div>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="answer-text"
            variant="standard"
            value={userInput}
            onChange={updateUserInput}
            inputProps={{ style: { textAlign: 'center', fontSize: '21px' } }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          <h3>Correct Answers: {correctAnswersCount}</h3>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={submitAnswer}>
            {questionNumber === quizInfo.questions ? 'Finish' : 'Next'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
