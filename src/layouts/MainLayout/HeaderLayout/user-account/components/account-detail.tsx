import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useContext } from 'react';

import { UserContext } from '@/contexts/user-context/user-context';

import { AccountMenu } from './account-menu';

export const AccountDetail = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <Box width={60}>
        <AccountMenu anchorOffset={118} />
      </Box>
      <Box width={150}>
        <ListItemText
          primary={userData?.nickname}
          primaryTypographyProps={{ color: 'white' }}
          secondary={userData?.email}
          secondaryTypographyProps={{ color: grey[400] }}
        />
      </Box>
    </>
  );
};
