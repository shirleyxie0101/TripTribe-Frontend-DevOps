import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { LogoButton } from '@/layouts/MainLayout/HeaderLayout/logo-button';
import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';
import { PlacesTab } from '@/layouts/MainLayout/HeaderLayout/places-tab';

import { MobileMenuButton } from './components/mobile-menu';
import { UserAccount } from './user-account';
export const TopNav: FC = () => {
  const pathname = usePathname();
  const autoHideSearchBarPageList = ['/signup', '/signin', '/'];
  const isHomepage = autoHideSearchBarPageList.includes(pathname); // hide search bar responsively in homepage
  const autoHideRestAttrPageList = ['/signup', '/signin'];
  const isSearAttrPage = autoHideRestAttrPageList.includes(pathname); // hide place permanently tab in signin/signup page
  const [showSearchBar, setShowSearchBar] = useState<boolean>(!isHomepage);

  // return to homepage, rerender header
  useEffect(() => {
    setShowSearchBar(!isHomepage);
  }, [isHomepage]);
  useEffect(() => {
    const handleScroll = () => {
      if (!isHomepage || (window.scrollY > 320 && showSearchBar === false)) {
        setShowSearchBar(true);
      } else if (showSearchBar && window.scrollY < 320) {
        setShowSearchBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomepage, showSearchBar]);

  const theme = useTheme();
  const responsiveStyle = {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  };

  return (
    <Box
      width={'100%'}
      pt={2}
      pb={2}
      sx={{
        transition: '0.2s',
      }}
    >
      <Grid
        container
        maxWidth="lg"
        px={1}
        sx={{
          zIndex: 1,
          marginX: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        {/* <Grid> */}
        <MobileMenuButton sx={{ height: 60 }} />
        {/* </Grid> */}
        <Grid px={2}>
          <LogoButton
            logoImageHeight={60}
            logoTextHeight={20}
          />
        </Grid>
        {/* to balance layout for menu button */}
        {!showSearchBar && (
          <Grid>
            <MobileMenuButton sx={{ height: 0, opacity: 0 }} />
          </Grid>
        )}
        {showSearchBar && (
          <Grid
            item
            px={2}
            xs={5}
            // sm={true}
            md={4}
          >
            <NaviTopSearchBar
              sx={{
                borderRadius: 2,
                minWidth: 100,
                maxWidth: 300,
              }}
              id="naviTopSearchBar"
              text={'Search Everything'}
            />
          </Grid>
        )}

        {/* places-tab. in middle */}
        {!isSearAttrPage && (
          <Grid
            item
            xs
            px={2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              display: showSearchBar ? { xs: 'none', lg: 'revet' } : { xs: 'none', md: 'revet' },
            }}
          >
            <PlacesTab />
          </Grid>
        )}

        {/* right top corner. different display with different login state */}
        <Grid
          item
          // lg={showSearchBar ? 2 : 2}
          px={2}
          xs={3}
          sx={responsiveStyle}
        >
          <UserAccount accountMenuStyle={'account menu'} />
        </Grid>
      </Grid>
    </Box>
  );
};
