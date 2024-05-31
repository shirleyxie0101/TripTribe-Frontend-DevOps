import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Button, CardHeader, Grid, Link, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';

import AuthPageContainer from '@/components/AuthPageContainer';
import { UserContext } from '@/contexts/user-context/user-context';
import axiosInstance from '@/utils/request';

type ResponseData = {
  data: { message: string };
};
enum msgType {
  Validated = 'Validated',
  IllegalToken = 'illegal token',
  ExpiredToken = 'expired token',
  Error = 'error',
  EmailValidated = 'Email token not found',
}
const VerifyEmail = () => {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const apiUrl = 'auth/verify';
  const refreshUrl = 'auth/resend-email';

  const { signIn, isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    router.push('/');
  }

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        setLoading(true);
        const response: ResponseData = await axiosInstance.request({
          method: 'post',
          url: apiUrl,
          data: { token },
        });

        if (
          response.data.message === msgType.Validated ||
          response.data.message === msgType.EmailValidated
        ) {
          setVerificationStatus('verified');
        } else if (
          response.data.message === msgType.IllegalToken ||
          response.data.message === msgType.ExpiredToken
        ) {
          setVerificationStatus('illegal code');
        } else {
          setVerificationStatus('error');
        }
      } catch (error) {
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      checkEmailVerification();
    }
  }, [token, router]);

  const verificationMessage = (verificationStatus: string) => {
    switch (verificationStatus) {
      case 'verified':
        return 'Your Email has been verified. Please login directly';
      case 'illegal code':
        return 'The verify token is illegal. Please resend an email to refresh it';
      default:
        return 'An error occurred during email verification. Please try again later.';
    }
  };

  const handleResendEmail = async () => {
    try {
      await axiosInstance.request({
        method: 'post',
        url: refreshUrl,
        data: { token },
      });
      enqueueSnackbar('Resend Email Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch (error) {
      enqueueSnackbar('Resend Email Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.error('Error during email resend:', error);
    }
  };

  return (
    <AuthPageContainer
      maxWidth="xs"
      isVerifyPage
    >
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            padding: '32px 24px',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
          >
            <CardHeader
              sx={{ p: 0 }}
              subheader={
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ pt: 2 }}
                >
                  {verificationMessage(verificationStatus)}
                  <br />
                </Typography>
              }
              title="Verify Email"
            />
          </Grid>

          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            {loading && <CircularProgress />}

            {verificationStatus === 'verified' && (
              <CheckCircleOutlineOutlinedIcon style={{ fontSize: 20, color: 'green' }} />
            )}
          </Grid>

          <Grid
            item
            xs={12}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={{ textTransform: 'none' }}
              disabled={loading}
              onClick={() => {
                if (verificationStatus === 'verified') {
                  router.push('/signin');
                } else {
                  handleResendEmail();
                }
              }}
            >
              {verificationStatus === 'verified' ? 'Sign In Now' : 'Resend Email'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};

export default VerifyEmail;
