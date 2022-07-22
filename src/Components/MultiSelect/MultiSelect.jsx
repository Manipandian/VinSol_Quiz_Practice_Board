import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MultiSelect = ({ options, value, onChange, label, disabled }) => {
  return (
    <FormControl sx={{ width: '100%' }} disabled={disabled}>
      <InputLabel id="multiselect-label">{label}</InputLabel>
      <Select
        labelId="multiselect-label"
        id="multiple"
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Name" />}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
