import { Avatar, Skeleton, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/contexts/user-context/user-context';

import { AccountDetail } from './components/account-detail';
import { AccountMenu } from './components/account-menu';
import { SignInSignUp } from './components/sign-in-sign-up';

type UserAccountProps = {
  userAccountStyle?: SxProps;
  accountMenuStyle: 'account menu' | 'account detail';
};

export const UserAccount: React.FC<UserAccountProps> = ({ userAccountStyle, accountMenuStyle }) => {
  const { isAuthenticated } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  const accountMenuList = {
    'account menu': <AccountMenu anchorOffset={14} />,
    'account detail': <AccountDetail />,
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        opacity: loading ? 0 : 1,
        transition: '0.2s',
        overflow: 'hidden',
        ...userAccountStyle,
      }}
    >
      {loading ? (
        <Skeleton
          variant="circular"
          sx={{ marginRight: 0.75 }}
        >
          <Avatar />
        </Skeleton>
      ) : isAuthenticated ? (
        accountMenuList[accountMenuStyle]
      ) : (
        <SignInSignUp />
      )}
    </Box>
  );
};
