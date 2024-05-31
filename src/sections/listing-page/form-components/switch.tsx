import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';

export interface FormSwitchProps {
  name: string;
  control: any;
  label: string;
}

export const FormSwitch = ({ name, control, label }: FormSwitchProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Switch
              checked={!!value}
              onChange={onChange}
            />
          }
          label={label}
        />
      )}
    />
  );
};
