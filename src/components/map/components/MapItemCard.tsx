import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Card, Grid, IconButton, Link, Rating, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';

import { CircularLoading } from '@/components/CircularLoading';
import LikeIconButton from '@/components/LikeIconButton';
import { PlaceProps } from '@/types/attractions-restaurants';
import { MainType } from '@/types/general';
import { isOpening } from '@/utils/is-opening';

import { getNextOpening } from './utils/getNextOpening';

type MapItemCardProps = {
  popupInfo: PlaceProps;
};

const MapItemCard: React.FC<MapItemCardProps> = ({ popupInfo }) => {
  const placeType = popupInfo.type === 'Restaurant' ? MainType.Restaurant : MainType.Attraction;
  const [imageComplete, setImageComplete] = useState(false);
  useEffect(() => {
    setImageComplete(false);
  }, [popupInfo._id]);

  // when card off mount, turn it off
  useEffect(() => {
    return () => {
      setImageComplete(false);
    };
  }, []);
  const openingStatus = isOpening(popupInfo);
  const id = popupInfo._id;

  const handleImageComplete = () => {
    setImageComplete(true);
  };

  return (
    // add the key will tell react to render the next opened card
    <Card key={`card_${popupInfo.type}_${popupInfo._id}`}>
      <Box position={'relative'}>
        <Link
          component={NextLink}
          href={`/${popupInfo.type.toLowerCase()}s/${popupInfo._id}`}
        >
          {!imageComplete && <CircularLoading size={40} />}
          <img
            onLoad={handleImageComplete}
            style={{ objectFit: 'cover' }}
            width={'100%'}
            height={148}
            src={popupInfo.photos[0].imageUrl}
            alt={popupInfo.name}
          />
        </Link>
      </Box>

      {/* country info */}
      <Box sx={{ height: '55%', p: 1, pt: 0 }}>
        <Grid container>
          <Grid
            item
            xs={8}
          >
            <Typography variant="subtitle1">
              {popupInfo.type}, {popupInfo.name}
            </Typography>
            <Rating
              name="simple-controlled"
              value={popupInfo.overAllRating}
              readOnly
            />
            <br />
            <Typography
              sx={{
                display: 'inline-block',
                color: openingStatus.includes('Open') ? 'green' : 'red',
                paddingRight: 1,
              }}
            >
              {openingStatus}
            </Typography>
            <br />
            <Typography
              variant="body2"
              sx={{ display: 'inline-block' }}
            >
              {getNextOpening(openingStatus, popupInfo)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'space-between', height: 40 }}
          >
            <IconButton
              LinkComponent={NextLink}
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={`/createReview?place=${popupInfo._id}&placeType=${popupInfo.type}`}
            >
              <RateReviewIcon
                sx={{ pt: 0.25 }}
                color="secondary"
              />
            </IconButton>
            <LikeIconButton
              placeType={placeType}
              id={id}
              withText={false}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default MapItemCard;
