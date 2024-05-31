import { Avatar, Box, Grid, Rating, Typography } from '@mui/material';
import InnerHTML from 'dangerously-set-html-content';
import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';

import { Review } from '@/types/review';

import Gallery from './gallery';

interface ReviewListProps {
  review: Review;
}

const ReviewCard: FC<ReviewListProps> = ({ review }) => {
  const { title = '', description = '', creator, updatedAt, photos = [] } = review;
  const avatarURL = creator?.userAvatar?.imageUrl || undefined;
  const avatarLetter = avatarURL === undefined && creator?.nickname ? creator?.nickname[0] : 'U';
  const date = updatedAt && dayjs(updatedAt).isValid() ? dayjs(updatedAt).format('DD/MM/YYYY') : '';

  return (
    <Grid
      container
      sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}
    >
      <Grid
        item
        xs={1}
      >
        <Avatar
          alt="User Avatar"
          src={avatarURL}
          sx={{ height: '40px' }}
          data-testid="user-avatar"
        >
          {avatarLetter}
        </Avatar>
      </Grid>
      <Grid
        item
        xs={11}
      >
        <Box sx={{ backgroundColor: '#F8F9FA', borderRadius: 3, pt: 1, pb: 2, paddingX: 2 }}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <Typography
                fontSize="14px"
                fontWeight="500"
                color="text.primary"
                data-testid="user-nickname"
              >
                {creator?.nickname}
              </Typography>

              <Box>
                <Rating
                  name="read-only"
                  value={review.rating}
                  size="small"
                  readOnly
                  sx={{ ml: 1, mt: 1 }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                fontSize="14px"
                color="text.secondary"
                data-testid="date"
              >
                {date}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              fontSize="14px"
              fontWeight="400"
              color={'text.primary'}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              component="div"
              fontSize="14px"
              color={'text.secondary'}
              sx={{
                overflow: 'auto',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
              data-testid="description"
            >
              <InnerHTML html={description} />
            </Typography>
          </Grid>
          {photos.length > 0 && (
            <Grid
              item
              xs={12}
            >
              <Gallery
                galleryID="gallery--open-in-original-size"
                images={photos}
              />
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
