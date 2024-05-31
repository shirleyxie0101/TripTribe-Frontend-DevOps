import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardHeader, Grid, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AuthPageContainer from '@/components/AuthPageContainer';
import { useCountDown } from '@/hooks/use-count-down';
import axiosInstance from '@/utils/request';

const ResendEmail: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const { countDown, isDisabled, setCountDown, setIsDisabled } = useCountDown();
  useEffect(() => {
    if (countDown > 0) setIsDisabled(true);
    if (countDown <= 0) setIsDisabled(false);
  }, [countDown]);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
  });

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      setIsSent(true);
      await axiosInstance.request({ method: 'post', url: 'auth/resend', data: { email } });
      setCountDown(60);
    } catch (error) {
      enqueueSnackbar('Failed to resend email.', { variant: 'error' });
      setCountDown(0);
    }
  };

  return (
    <AuthPageContainer maxWidth="xs">
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
              title={'Resend Email'}
              subheader={
                'If you have not received your email, please re-enter your email, and we will resend an email to the address.'
              }
            ></CardHeader>
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
                  FormHelperTextProps={{ sx: { color: isValid ? 'success.main' : 'error' } }}
                  helperText={
                    errors.email?.message ||
                    (isSent && 'An email has been sent to the address above.')
                  }
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
              disabled={!isValid || isDisabled}
            >
              {`Resend Email${countDown > 0 ? ` (${countDown})` : ''}`}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};

export default ResendEmail;
