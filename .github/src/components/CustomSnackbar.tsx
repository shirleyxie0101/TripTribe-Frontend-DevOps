import MuiAlert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React, { useState } from 'react';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  onClose: (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, onClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(open);

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    onClose(event, reason);
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="success"
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
