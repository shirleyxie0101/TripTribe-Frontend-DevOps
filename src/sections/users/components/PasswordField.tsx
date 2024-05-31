import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { UserPasswordResetInput } from '../SecurityCard';

type Props = {
  label: string;
  fieldName: keyof UserPasswordResetInput;
};

const PasswordField: FC<Props> = ({ label, fieldName }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<UserPasswordResetInput>();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      item
      md={12}
      sx={{
        mx: 0,
      }}
    >
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              my: 0.5,
              width: '50%',
            }}
            variant="outlined"
            label={label}
            type={showPassword ? 'text' : 'password'}
            onBlur={() => {
              trigger(fieldName);
            }}
            onChange={onChange}
            value={value}
            error={!!errors[fieldName]}
            helperText={errors[fieldName]?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};
export default PasswordField;
