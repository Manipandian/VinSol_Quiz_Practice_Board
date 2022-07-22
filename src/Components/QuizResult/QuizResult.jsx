import { Grid, Box } from '@mui/material';
import './QuizResult.css';

const QuizResult = ({ answersData, correctAnswersCount }) => {
  return (
    <Box sx={{ width: '65%', height: '100%' }}>
      {answersData.map((answer, index) => {
        const { number1, number2, randomOperator, correctAnswer, userAnswer } =
          answer;
        return (
          <Grid container>
            <Grid item xs={10} className="result-data">
              {`${
                index + 1
              }. ${randomOperator} number ${number1} with ${number2} is equals to`}
            </Grid>
            <Grid
              item
              xs={2}
              className={`result-data ${userAnswer ? '' : ' wrong-answer'}`}
            >
              {` ${correctAnswer}`}
            </Grid>
          </Grid>
        );
      })}
      <Box
        component="h3"
        sx={{ m: 2, textAlign: 'center' }}
      >{`Your Score: ${correctAnswersCount}`}</Box>
    </Box>
  );
};

export default QuizResult;
