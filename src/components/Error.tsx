import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

import Layout from '@/layouts/MainLayout';

interface ErrorProps {
  errorMessage: string;
  errorStatus: number | undefined;
}

const Error: React.FC<ErrorProps> = ({ errorStatus }) => {
  let message = '';
  switch (Number(errorStatus)) {
    case 400:
      message = '400: This page is not working right now, please try again';
      break;
    case 401:
      message = '401: You are not authorized to enter this page, please sign in first';
      break;
    case 403:
      message = '403: You have no permission to view this page, please contact admin';
      break;
    case 404:
      message = '404: Cannot find user with this ID, please try again';
      break;
    case 500:
      message = '500: Internal Server Error';
      break;
    default:
      message = 'Got lost? Please try again';
  }

  const errorCode = errorStatus || 404;
  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          mt: 10,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
          }}
        ></Box>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  mb: 3,
                  textAlign: 'center',
                }}
              >
                <img
                  alt="Under development"
                  src={`/assets/error-${errorCode}.png`}
                  style={{
                    display: 'inline-block',
                    maxWidth: '50%',
                    width: 400,
                  }}
                />
              </Box>
              <Typography
                align="center"
                sx={{ mb: 3 }}
                variant="h5"
              >
                {message}
              </Typography>

              <Button
                component={NextLink}
                href="/"
                startIcon={
                  <SvgIcon fontSize="small">
                    <ArrowBackIcon />
                  </SvgIcon>
                }
                sx={{
                  my: 3,
                }}
                variant="contained"
              >
                Go back to homepage
              </Button>
              <Button
                component={NextLink}
                href="/signin"
                startIcon={
                  <SvgIcon fontSize="small">
                    <ArrowBackIcon />
                  </SvgIcon>
                }
                sx={{
                  my: 3,
                }}
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>
    </Layout>
  );
};

export default Error;
