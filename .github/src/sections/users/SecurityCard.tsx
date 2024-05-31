import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import axiosInstance from '@/utils/request';

import CardTheme from './components/CardTheme';
import PasswordField from './components/PasswordField';

export type UserPasswordResetInput = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
interface ValidationError {
  data: {};
  // errors: Record<string, string[]>;
}
export const validationSchema = yup.object().shape({
  oldPassword: yup.string().required().min(8, 'Password must be at least 8 characters long'),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/,
      'Your Password must have at least 8 characters, and include at least one uppercase letter, one lowercase letter, one symbol and one number'
    )
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match'),
});

export const SecurityCard: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<UserPasswordResetInput>({ resolver: yupResolver(validationSchema) });
  const { handleSubmit, formState, setError } = formMethods;
  const { isDirty } = formState;
  const onSubmit: SubmitHandler<UserPasswordResetInput> = async (data) => {
    setIsLoading(true);
    const { oldPassword, newPassword } = data;
    try {
      await axiosInstance.request({
        url: '/users/me/password',
        method: 'put',
        data: { oldPassword, newPassword },
      });
      enqueueSnackbar('Update Password Successfully!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      setIsLoading(false);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const { data: responseData } = err.response;
        enqueueSnackbar(responseData.exceptionMessage, {
          variant: 'error',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        if (responseData.exceptionMessage.includes('old password')) {
          setError('oldPassword', {
            message: responseData.exception.response.message,
          });
        }
      } else {
        enqueueSnackbar('An error occurred during the password update', {
          variant: 'error',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }

      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ bgcolor: CardTheme.bgColor }}>
          <CardContent>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">Password</Typography>
            </Box>
            <Divider />
            <Grid
              container
              spacing={1}
              mt={1}
            >
              <PasswordField
                label="Old Password"
                fieldName="oldPassword"
              />

              <PasswordField
                label="New Password"
                fieldName="newPassword"
              />

              <PasswordField
                label="Confirm Password"
                fieldName="confirmPassword"
              />
            </Grid>
          </CardContent>
          <Divider />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              type="submit"
              size="small"
              variant="contained"
              disabled={!isDirty || isLoading}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    </FormProvider>
  );
};
