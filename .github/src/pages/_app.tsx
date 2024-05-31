import '@/styles/globals.css';
import '@/styles/map.css';
import '@/styles/SearchBar.css';
import 'photoswipe/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ApolloProvider } from '@apollo/client';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { ReactElement, ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { RTL } from '@/components/rtl';
import { SettingsButton } from '@/components/settings/settings-button';
import { SettingsDrawer } from '@/components/settings/settings-drawer';
import { Toaster } from '@/components/toaster';
import { SettingsConsumer, SettingsProvider } from '@/contexts/settings';
import { UserProvider } from '@/contexts/user-context/user-provider';
import theme from '@/styles/theme';
import { createTheme } from '@/theme';
import { createApolloClient } from '@/utils/apollo-client';
import createEmotionCache from '@/utils/create-emotion-cache';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
const clientSideEmotionCache = createEmotionCache();
export interface TripTribeAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: TripTribeAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const client = createApolloClient();
  const helmetContext = {};

  const router = useRouter();
  const { pathname } = router;

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <UserProvider>
          <HelmetProvider context={helmetContext}>
            <SnackbarProvider maxSnack={3}>
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    // Prevent theme flicker when restoring custom settings from browser storage
                    if (!settings.isInitialized) {
                      // return null;
                    }

                    const themeDoc = pathname.includes('/admin')
                      ? createTheme({
                          colorPreset: settings.colorPreset,
                          contrast: settings.contrast,
                          direction: settings.direction,
                          paletteMode: settings.paletteMode,
                          responsiveFontSizes: settings.responsiveFontSizes,
                        })
                      : theme;

                    return (
                      <ThemeProvider theme={themeDoc}>
                        <Head>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          {pathname.includes('/admin') ? (
                            <meta
                              name="theme-color"
                              content={themeDoc.palette.neutral[900]}
                            />
                          ) : null}
                        </Head>
                        <RTL direction={settings.direction}>
                          <CssBaseline />
                          {getLayout(<Component {...pageProps} />)}
                          {pathname.includes('/admin') ? (
                            <>
                              <SettingsButton onClick={settings.handleDrawerOpen} />
                              <SettingsDrawer
                                canReset={settings.isCustom}
                                onClose={settings.handleDrawerClose}
                                onReset={settings.handleReset}
                                onUpdate={settings.handleUpdate}
                                open={settings.openDrawer}
                                values={{
                                  colorPreset: settings.colorPreset,
                                  contrast: settings.contrast,
                                  direction: settings.direction,
                                  paletteMode: settings.paletteMode,
                                  responsiveFontSizes: settings.responsiveFontSizes,
                                  stretch: settings.stretch,
                                  navColor: settings.navColor,
                                }}
                              />
                              <Toaster />
                            </>
                          ) : null}
                        </RTL>
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            </SnackbarProvider>
          </HelmetProvider>
        </UserProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
