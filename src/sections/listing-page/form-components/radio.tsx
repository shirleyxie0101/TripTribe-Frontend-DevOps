import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { Controller } from 'react-hook-form';

export interface FormRadioProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  radioOptions?: string[];
}

export const FormRadio: React.FC<FormRadioProps> = ({ name, control, label, radioOptions }) => {
  const generateRadioOptions = () => {
    return radioOptions?.map((option) => (
      <FormControlLabel
        key={option}
        value={option}
        label={
          <Box sx={{ display: 'flex' }}>
            <Rating
              name="read-only"
              value={Number(option)}
              readOnly
            />
            {option !== '5' && <Typography>&Up</Typography>}
          </Box>
        }
        control={
          <Radio
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
          />
        }
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value ?? ''}
            onChange={onChange}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
