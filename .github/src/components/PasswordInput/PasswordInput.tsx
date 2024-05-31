import { Box, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

interface PasswordInputProps {
  onChange: (password: string, isValid: boolean) => void;
  onBlur: () => void;
  error: boolean;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onChange, onBlur, error, helperText }) => {
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    upperAndLowercase: false,
    number: false,
    specialChar: false,
  });

  const updatePasswordValidity = useCallback(
    (errors: any) => {
      const isValid = Object.values(errors).every((valid) => valid);
      onChange(password, isValid);
    },
    [password, onChange]
  );

  const validatePassword = useCallback(
    (password: string) => {
      const errors = {
        length: password.length >= 8,
        upperAndLowercase: /[a-z]/.test(password) && /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password),
      };

      setPasswordErrors(errors); // Update passwordErrors state
      updatePasswordValidity(errors);
    },
    [updatePasswordValidity]
  );

  useEffect(() => {
    if (password) {
      validatePassword(password);
    }
  }, [password, validatePassword]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleBlur = () => {
    onBlur();
  };

  return (
    <Box>
      <TextField
        fullWidth
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        helperText={helperText}
      />
      <Box sx={{ mt: 0.5, color: 'gray' }}>
        <Typography variant="body2">Enter a strong password:</Typography>
        <Typography
          variant="body2"
          sx={{ color: passwordErrors.length ? 'green' : 'gray' }}
        >
          ● At least 8 characters
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: passwordErrors.upperAndLowercase ? 'green' : 'gray' }}
        >
          ● Uppercase and lowercase characters
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: passwordErrors.number ? 'green' : 'gray' }}
        >
          ● One number
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: passwordErrors.specialChar ? 'green' : 'gray' }}
        >
          ● One special character
        </Typography>
      </Box>
    </Box>
  );
};

export default PasswordInput;
