import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import { type FC, useContext } from 'react';

import { UserContext } from '@/contexts/user-context/user-context';
import { usePopover } from '@/hooks/use-popover';

import { AccountPopover } from './account-popover';

export const AccountButton: FC = () => {
  const popover = usePopover<HTMLButtonElement>();

  const { userData } = useContext(UserContext);
  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          src={userData?.userAvatar?.imageUrl}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
