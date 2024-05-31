import { CircularProgress } from '@mui/material';
import React from 'react';

export const CircularLoading: React.FC<{ size: number }> = ({ size }) => {
  return (
    <CircularProgress
      aria-label="Circular Loading"
      size={size}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-20px',
        marginLeft: '-20px',
      }}
    />
  );
};
