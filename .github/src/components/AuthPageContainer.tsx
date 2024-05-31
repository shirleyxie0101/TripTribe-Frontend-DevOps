import { Container, Paper } from '@mui/material';
import React from 'react';

import BackLink from './BackLink';

type AuthPageContainerProps = {
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isVerifyPage?: boolean;
};

const AuthPageContainer = ({
  maxWidth,
  children,
  isVerifyPage = false,
}: AuthPageContainerProps) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
  };

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        ...containerStyle,
      }}
    >
      {!isVerifyPage && <BackLink />}
      <Paper
        elevation={16}
        sx={{ width: '420px', borderRadius: 5 }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AuthPageContainer;
