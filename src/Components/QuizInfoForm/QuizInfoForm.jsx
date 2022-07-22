import TextField from '@mui/material/TextField';
import MultiSelect from '../MultiSelect/MultiSelect';
import { Grid, Button } from '@mui/material';
import { OPERATORS } from '../../Constants';

const QuizInfoForm = ({
  quizInfo,
  setQuizeInfo,
  disableForm,
  resetQuizCallBack,
}) => {
  const operatorOptions = Object.keys(OPERATORS);

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setQuizeInfo(
      typeof value === 'string' ? value.split(',') : value,
      'operators'
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <TextField
          id="questions-text"
          type="number"
          label="No. of Qauestions"
          variant="outlined"
          disabled={disableForm}
          value={quizInfo.questions}
          onChange={(e) => setQuizeInfo(Number(e.target.value), 'questions')}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="max-range-text"
          type="number"
          label="Max Number Range"
          variant="outlined"
          value={quizInfo.range}
          disabled={disableForm}
          onChange={(e) => setQuizeInfo(Number(e.target.value), 'range')}
        />
      </Grid>
      <Grid item xs={2}>
        <MultiSelect
          label="Operators"
          value={quizInfo.operators}
          options={operatorOptions}
          changeEvent={() => {}}
          disabled={disableForm}
          onChange={handleMultiSelect}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={2}>
            <Button variant="outlined" onClick={resetQuizCallBack}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuizInfoForm;
