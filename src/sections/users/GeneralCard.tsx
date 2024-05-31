import { yupResolver } from '@hookform/resolvers/yup';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { InvisibleInput } from '@/components/InvisibleInput';
import { UserContext } from '@/contexts/user-context/user-context';
import { User } from '@/types/user';
import axiosInstance from '@/utils/request';

import CardTheme from './components/CardTheme';

type GeneralCardProps = {
  user: User;
};

const validationSchema = yup.object().shape({
  nickname: yup.string().required('Nickname is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(300, 'Description must be less than 300 characters long'),
});

type UserProfileFormInputs = {
  nickname: string;
  description: string;
};

export const GeneralCard: React.FC<GeneralCardProps> = ({ user }) => {
  // if is not me, hide edit button
  const { userData } = useContext(UserContext);
  const isMe = user._id === userData?._id;

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<UserProfileFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nickname: user.nickname,
      description: user.description,
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit: SubmitHandler<UserProfileFormInputs> = (data) => {
    axiosInstance
      .request<User>({
        url: `/users/${user._id}`,
        method: 'put',
        data,
      })
      .then(() => {
        enqueueSnackbar('Update Succeed!', {
          variant: 'success',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.exceptionMessage, {
          variant: 'error',
          autoHideDuration: 1500,
          disableWindowBlurListener: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      })
      .finally(() => {});
  };

  const charLimit = 300;
  const watchDescription = watch('description');
  const charLeft = charLimit - watchDescription?.length;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Card sx={{ bgcolor: CardTheme.bgColor }}>
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6">Personal info</Typography>
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
              sx={{
                mt: 1,
              }}
            >
              Customize how your profile information will appear to the networks.
            </Typography>
          </Box>
          <Divider />
          <Grid
            container
            spacing={1}
            mt={1}
          >
            <Grid
              item
              md={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Avatar
                  src={isMe ? userData.userAvatar?.imageUrl : user.userAvatar?.imageUrl}
                  sx={{
                    height: 150,
                    m: 2,
                    width: 150,
                  }}
                />
                <Box
                  sx={{
                    bgcolor: 'white',
                    position: 'absolute',
                    zIndex: 2,
                    border: `${CardTheme.borderColor} solid 2px`,
                    borderRadius: '50%',
                    left: 130,
                    top: 130,
                    boxShadow: 'sm',
                  }}
                >
                  {isMe && (
                    <IconButton
                      color="primary"
                      size="small"
                      component="label"
                    >
                      <EditRoundedIcon />
                      <InvisibleInput userId={user._id} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                variant="outlined"
                label="ID"
                value={user._id}
                fullWidth
                disabled
                sx={{
                  m: 1,
                }}
              ></TextField>
              <TextField
                variant="outlined"
                label="Email Address"
                value={user.email}
                disabled
                fullWidth
                sx={{
                  m: 1,
                }}
              ></TextField>
              <Controller
                name="nickname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={isMe ? false : true}
                    variant="outlined"
                    label="Nickname"
                    name="nickname"
                    onBlur={() => {
                      trigger('nickname');
                    }}
                    value={value}
                    onChange={onChange}
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                    fullWidth
                    sx={{
                      m: 1,
                    }}
                  ></TextField>
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6">Bio</Typography>
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
              sx={{
                mt: 1,
              }}
            >
              Write a short introduction to be displayed on your profile.
            </Typography>
          </Box>
          <Divider />
          <Stack
            spacing={2}
            sx={{ my: 1 }}
          >
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  disabled={isMe ? false : true}
                  size="small"
                  multiline
                  rows={4}
                  sx={{ mt: 1.5 }}
                  name="description"
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    trigger('description');
                  }}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  inputProps={{
                    maxLength: { charLimit },
                  }}
                />
              )}
            />
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
            >
              {charLeft} characters left
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          {isMe ? (
            <Button
              size="small"
              variant="contained"
              type="submit"
              disabled={!isValid || !isDirty}
            >
              Save
            </Button>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
