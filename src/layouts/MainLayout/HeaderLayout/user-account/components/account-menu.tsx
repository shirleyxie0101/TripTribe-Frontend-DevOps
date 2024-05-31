import AdminIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logout from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';

import { UserTab } from '@/constants/userProfilePage';
import { UserContext } from '@/contexts/user-context/user-context';
import { UserRole } from '@/types/user';

import { UserAvatar } from './user-avatar';
type AccountMenuProps = {
  anchorOffset: number;
};

export const AccountMenu: React.FC<AccountMenuProps> = ({ anchorOffset }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { signOut, userData } = useContext(UserContext);

  const router = useRouter();
  // set state for menu opening
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // turn the anchorElement into boolean
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOut = async () => {
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
  };
  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Box sx={{ width: 'auto', lineHeight: 40 }}>
              <UserAvatar />
            </Box>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                width: 10,
                right: anchorOffset,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          component={NextLink}
          href={`/users/me/${UserTab.General}`}
        >
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {userData?.role === UserRole.Admin && (
          <MenuItem
            component={NextLink}
            href={'/admin'}
          >
            <ListItemIcon>
              <AdminIcon fontSize="small" />
            </ListItemIcon>
            Admin
          </MenuItem>
        )}
        <MenuItem
          component={NextLink}
          href={`/users/me/${UserTab.Favorites}`}
        >
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          Favorites
        </MenuItem>

        <MenuItem
          component={NextLink}
          href={`/users/me/${UserTab.Reviews}`}
        >
          <ListItemIcon>
            <RateReviewIcon fontSize="small" />
          </ListItemIcon>
          Reviews
        </MenuItem>
        <MenuItem
          component={NextLink}
          href={`/users/me/${UserTab.Security}`}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Security
        </MenuItem>

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
