import { Box, Button } from '@mui/material';
import React from 'react';

export const SignInSignUp = () => {
  return (
    <Box
      gap={1.5}
      sx={{ display: 'flex', height: 40 }}
    >
      <Button
        href="/signin"
        variant="contained"
        sx={{ height: 32 }}
      >
        Signin
      </Button>
      <Button
        href="/signup"
        variant="contained"
        sx={{ height: 32 }}
      >
        Signup
      </Button>
    </Box>
  );
};
