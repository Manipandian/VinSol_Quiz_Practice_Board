import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const QuizStartInfo = ({ startQuizCallBack, quizInfo }) => {
  const { questions, range, operators } = quizInfo;
  return (
    <div>
      <Box component="h4" m={1}>{`Questions:  ${questions}`}</Box>
      <Box component="h4" m={1}>{`Number Range:  ${range}`}</Box>
      <Box component="h4" m={1}>{`Operators:  ${operators}`}</Box>
      <Box m={1}>
        <Button variant="contained" onClick={startQuizCallBack}>
          Start Quiz
        </Button>
      </Box>
    </div>
  );
};

export default QuizStartInfo;
