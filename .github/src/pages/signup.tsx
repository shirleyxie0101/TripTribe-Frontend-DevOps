import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AuthPageContainer from '@/components/AuthPageContainer';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import Seo from '@/components/seo/Seo';
import { SignUpInputs, UserContext } from '@/contexts/user-context/user-context';
import { SeoProps } from '@/types/seo';

export type SignUpFormInputs = {
  passwordConfirm: string;
  terms: boolean;
} & SignUpInputs;

const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(100, 'First name is no more than 100 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(100, 'Last name is no more than 100 characters')
    .required('Last name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must be at least 8 characters, and include at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  terms: yup.boolean().default(false).oneOf([true], 'You must agree to the Terms and Conditions'),
});

const SignUpPage = ({ seoValue }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { signIn, isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    router.push('/');
  }

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { signUp } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      await signUp(data);
      enqueueSnackbar('Register Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      router.push('/signin');
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const { data: responseData } = err.response;
        enqueueSnackbar(responseData.exceptionMessage, {
          variant: 'error',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } else {
        enqueueSnackbar('Register Failed', {
          variant: 'error',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
      console.log(err);
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
          alignItems="start"
        >
          <Grid
            item
            xs={12}
          >
            <CardHeader
              sx={{ p: 0, mb: 1 }}
              subheader={
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Already have an account? &nbsp;
                  <Link
                    component={NextLink}
                    href="/signin"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Log in
                  </Link>
                </Typography>
              }
              title="Register"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  onBlur={() => {
                    trigger('firstName');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  onBlur={() => {
                    trigger('lastName');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
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
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <PasswordInput
                  onChange={(value, isValid) => {
                    onChange(value);
                  }}
                  onBlur={() => {
                    onBlur();
                    trigger('password');
                  }}
                  error={!!error}
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
              name="passwordConfirm"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  label="Password Confirmation"
                  onBlur={() => {
                    trigger('passwordConfirm');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="terms"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label={
                    <span>
                      I agree to the&nbsp;
                      <Link
                        component={NextLink}
                        href="/terms"
                        underline="always"
                      >
                        Terms and Conditions
                      </Link>
                    </span>
                  }
                />
              )}
            />
            <FormHelperText error={!!errors.terms}>{errors.terms?.message}</FormHelperText>
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};
export const getServerSideProps: GetServerSideProps = (async (context) => {
  const seoValue: SeoProps = {
    title: 'TripTribe - Register',
    description:
      'Join TripTribe to reshape your digital tourism experience. Register for transparent ratings and authentic reviews of attractions and restaurants.',
    url: 'https://www.trip-tribe.com/signup',
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

export default SignUpPage;
