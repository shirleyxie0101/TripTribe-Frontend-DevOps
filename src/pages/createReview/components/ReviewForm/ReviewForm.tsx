import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import router from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import axiosInstance from '@/utils/request';
import { removeHtmlTags } from '@/utils/textUtils';

import FileUploader from './components/FileUploader';
import QuillEditor from './components/QuillEditor';

type ReviewFormProps = {
  placeId: string;
  placeType: string;
  onFormDirtyChange: (isDirty: boolean) => void;
};

type Photo = {
  imageAlt: string;
  imageUrl: string;
};

type ReviewData = {
  title: string;
  description: string;
  rating: number;
  files?: Photo[];
};
// Yup schema for form validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup
    .string()
    .transform((value) => removeHtmlTags(value))
    .required('Description is required')
    .min(30, 'Description must be at least 30 characters')
    .max(300, 'Description must be at most 300 characters'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1 Star')
    .max(5, 'Rating must be at most 5 Star'),
});

const ReviewForm: React.FC<ReviewFormProps> = ({ placeId, placeType, onFormDirtyChange }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    getValues,
  } = useForm<ReviewData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      rating: 5,
    },
  });

  useEffect(() => {
    onFormDirtyChange(isDirty);
  }, [isDirty, onFormDirtyChange]);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const updateUploadedFiles = (newFiles: File[]) => {
    setUploadedFiles(newFiles);
  };

  const onSubmit: SubmitHandler<ReviewData> = async (data) => {
    const descriptionValue = getValues('description') || '';

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', descriptionValue);
    formData.append('rating', data.rating.toString());
    formData.append('placeId', placeId);
    formData.append('placeType', placeType[0].toUpperCase() + placeType.slice(1));
    uploadedFiles.forEach((file) => {
      formData.append('files', file);
    });
    try {
      const response = await axiosInstance.request({
        method: 'post',
        url: '/reviews',
        data: formData,
      });
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      setTimeout(() => {
        router.push(`${placeType}s/${placeId}`);
      }, 2000);
    } catch (error) {
      enqueueSnackbar('Error submitting review', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <Typography
              variant="h5"
              color="initial"
              gutterBottom
            >
              Title your review?
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <Typography
              variant="h5"
              color="initial"
              gutterBottom
            >
              How would you rate your experience?
            </Typography>
            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Rating
                    value={Number(value)}
                    onChange={onChange}
                    name="rating"
                    max={5}
                    sx={{
                      fontSize: '3rem',
                    }}
                  />
                  {errors.rating && (
                    <Typography
                      color="error"
                      variant="caption"
                      component="div"
                    >
                      {errors.rating.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ minHeight: '200px', flexGrow: 1 }}
          >
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <QuillEditor
                    label={'Write your review'}
                    value={value}
                    onChange={onChange}
                  />
                  <Typography
                    variant="caption"
                    color={removeHtmlTags(value).length > 300 ? 'error' : 'initial'}
                    align="right"
                    sx={{ marginTop: 1 }}
                  >
                    {removeHtmlTags(value).length}/300 characters
                  </Typography>
                  {errors.description && (
                    <Typography
                      color="error"
                      variant="caption"
                      component="div"
                    >
                      {errors.description.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              variant="h5"
              color="initial"
              gutterBottom
            >
              Upload photos
            </Typography>
            <FileUploader updateUploadedFiles={updateUploadedFiles} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ my: '30px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ReviewForm;
