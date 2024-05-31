import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { useCallback, useContext } from 'react';

import { UserContext } from '@/contexts/user-context/user-context';
import { useRouter } from '@/hooks/use-router';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { signOut, userData } = useContext(UserContext);

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await signOut();
      router.push('/');
      enqueueSnackbar('Log Out Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch (err) {
      enqueueSnackbar('Log Out Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.error(err);
    }
  }, [router, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          {userData?.firstName} {userData?.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userData?.email}
        </Typography>
      </Box>
      <Divider />
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center',
        }}
      >
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
