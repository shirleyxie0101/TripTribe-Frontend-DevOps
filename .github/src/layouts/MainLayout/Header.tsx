import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import { TopNav } from '@/layouts/MainLayout/HeaderLayout/TopNav';

const Header: React.FC = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{ bgcolor: 'white', color: 'inherit', borderBottom: '1px solid' }}
      elevation={0}
    >
      <Toolbar>
        <TopNav />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
