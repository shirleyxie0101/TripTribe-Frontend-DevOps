import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import useRedirectPreparation from '@/hooks/use-redirect-prapreration';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const sx = {};
  useRedirectPreparation();
  return (
    <React.Fragment>
      <Header />
      <Container
        fixed
        component="main"
        sx={sx}
      >
        {children}
      </Container>
      <Footer />
    </React.Fragment>
  );
};
export default Layout;
