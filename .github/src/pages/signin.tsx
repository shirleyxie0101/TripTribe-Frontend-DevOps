import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AuthPageContainer from '@/components/AuthPageContainer';
import Seo from '@/components/seo/Seo';
import { SignInInputs, UserContext } from '@/contexts/user-context/user-context';
import { SeoProps } from '@/types/seo';

export type SignInFormInputs = SignInInputs;

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const SignInPage = ({ seoValue }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const router = useRouter();
  const { signIn, isAuthenticated } = useContext(UserContext);
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem('redirectPath') || '/';
      router.push(redirectPath);
    }
  }, []);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      await signIn(data);
      if (localStorage.getItem('loginMessage') === 'Unverified') {
        enqueueSnackbar('Email need to be verified!', {
          variant: 'error',
          autoHideDuration: 3500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        localStorage.removeItem('loginMessage');
        setIsVerified(false);
        return;
      }
      enqueueSnackbar('Login Successfully!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      const redirectPath = sessionStorage.getItem('redirectPath') || '/';
      router.push(redirectPath);
    } catch (err) {
      enqueueSnackbar('Login Failed!', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  return (
    <AuthPageContainer maxWidth="xs">
      <Seo
        title={seoValue.title}
        description={seoValue.description}
        url={seoValue.url}
        type={seoValue.type}
        name={seoValue.name}
        img={seoValue.img}
      />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
                >
                  Don&apos;t have an account? &nbsp;
                  <Link
                    component={NextLink}
                    href="/signup"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Register
                  </Link>
                </Typography>
              }
              title="Log in"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  onBlur={() => {
                    trigger('email');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onBlur={() => {
                    trigger('password');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
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
              disabled={!isValid}
            >
              Log in
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignContent="center"
            justifyContent={'space-around'}
          >
            {!isVerified && (
              <Link
                component={NextLink}
                href="./resend"
                underline="always"
                display={'block'}
              >
                Resend Your Email
              </Link>
            )}
            <Link
              component={NextLink}
              href="./passwordReset"
              underline="always"
              display={'block'}
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};
export const getServerSideProps: GetServerSideProps = (async (context) => {
  const seoValue: SeoProps = {
    title: 'TripTribe - Login',
    description:
      'Log in to TripTribe to explore attractions and restaurants. Join our platform for transparent ratings and authentic reviews.',
    url: 'https://www.trip-tribe.com/signin',
    type: 'website',
    name: '',
    img: '/assets/bridge.png',
  };
  return {
    props: {
      seoValue,
    },
  };
}) satisfies GetServerSideProps<{
  seoValue: SeoProps;
}>;

export default SignInPage;
