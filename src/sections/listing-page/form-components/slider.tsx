import { FormLabel, Slider } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export interface FormSliderProps {
  name: string;
  control: any;
  label: string;
  sliderMark?: {
    value: number;
    label: string;
  }[];
  sliderRange?: {
    max: number;
    min: number;
    step: number;
  };
}

export const FormSlider = ({ name, control, label, sliderMark, sliderRange }: FormSliderProps) => {
  const handleChange = (_: Event, newValue: number | number[]) => newValue as number;

  return (
    <React.Fragment>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Slider
            sx={{ mt: 5, mr: 2, ml: 2 }}
            value={value ?? 0}
            defaultValue={value ?? 0}
            marks={sliderMark}
            onChange={(e, newValue) => onChange(handleChange(e, newValue))}
            valueLabelDisplay="on"
            min={sliderRange?.min}
            max={sliderRange?.max}
            step={sliderRange?.step}
          />
        )}
      />
    </React.Fragment>
  );
};
