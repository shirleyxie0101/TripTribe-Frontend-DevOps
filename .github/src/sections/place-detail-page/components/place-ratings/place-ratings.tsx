import { Box, Button, Fade, LinearProgress, Rating, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AxiosError } from 'axios';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { CircularLoading } from '@/components/CircularLoading';
import { PlaceProps } from '@/types/attractions-restaurants';

import { RatingDistribution } from '../../place-content';

type PlaceRatingsProps = {
  placeData: PlaceProps;
  ratingTotalCount: number;
  ratingData: RatingDistribution[] | undefined;
  ratingError: AxiosError | undefined;
  ratingIsLoading: Boolean;
};

export const PlaceRatings: React.FC<PlaceRatingsProps> = ({
  placeData,
  ratingTotalCount,
  ratingData,
  ratingError,
  ratingIsLoading,
}) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);

  const avgRating: number = placeData.overAllRating;
  if (ratingIsLoading) return <CircularLoading size={80} />;
  if (ratingError) return <Box>{`${ratingError.code}: ${ratingError.message}`}</Box>;
  if (ratingData === undefined || ratingTotalCount === 0) {
    return (
      <Fade
        in={show}
        timeout={1100}
      >
        <Box
          pt={10}
          ref={ref}
        >
          <Typography
            textAlign={'center'}
            variant="h5"
            fontWeight={600}
          >
            No Reviews
          </Typography>
          <Button
            sx={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-50%,-50%)',
            }}
            href="/write-review"
            LinkComponent={NextLink}
            variant="contained"
          >
            Write Review
          </Button>
        </Box>
      </Fade>
    );
  }
  return (
    <Box sx={{ height: '100%', maxWidth: '100%', px: 1.5 }}>
      <Stack
        direction={'column'}
        alignItems={'center'}
        sx={{ marginBottom: 2.375 }}
      >
        <Box
          sx={{
            height: 50,
            px: 1.375,
            pb: 1.25,
            borderBottom: '1px solid',
            borderColor: grey[400],
            width: 1,
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          <Typography
            pt={1}
            variant="h6"
            lineHeight={1.5}
            fontWeight={600}
          >
            Ratings
          </Typography>
        </Box>
        {/* <Typography
          paddingTop={1}
          variant="h5"
          component="div"
          textAlign={'center'}
          fontWeight={500}
        >
          {avgRating ? avgRating : 0}
        </Typography> */}
        <Rating
          name="half-rating-read"
          aria-label="Detail Average Rating"
          value={avgRating}
          defaultValue={0}
          precision={0.5}
          readOnly
          size="medium"
          data-testid="rating"
        />
      </Stack>

      <Box>
        {ratingData.map((item, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
            key={index}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '12px' }}
            >
              {item.rating} Stars
            </Typography>
            <Box sx={{ width: '60%' }}>
              <LinearProgress
                variant="determinate"
                // {...props}
                value={Math.round((item.count / ratingTotalCount) * 100)}
                sx={{ height: '20px' }}
                data-testid={`linearProgress-${index}`}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '12px' }}
              >{`${Math.round((item.count / ratingTotalCount) * 100)}%`}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
