import { Box, Card, Grid, Link } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { usersSaves } from '@/api/usersSaves';
import { usersSavesDelete } from '@/api/usersSavesDelete';
import { RouterLink } from '@/components/router-link';
import { UserContext } from '@/contexts/user-context/user-context';
import FavoriteIconButton from '@/sections/home/favoriteIconButton';
import { MainType } from '@/types/general';
import { truncateText } from '@/utils/truncate-text';

import LikeIconButton from './LikeIconButton';

type ImageCardProps = {
  _id: string;
  name: string;
  description: string;
  overAllRating: number;
  imageUrl: string;
  placeType: string;
};

const PlaceCard: React.FC<ImageCardProps> = ({
  _id,
  imageUrl,
  name,
  description,
  overAllRating,
  placeType,
}) => {
  const path = `/${placeType}/${_id}`;
  let type: MainType;
  type = placeType == 'attractions' ? MainType.Attraction : MainType.Restaurant;
  // const { isAuthenticated, userData } = useContext(UserContext);
  // const router = useRouter();
  // const [isFavorite, setisFavorite] = useState(false);

  // const initialCheck = () => {
  //   if (
  //     isAuthenticated &&
  //     userData &&
  //     (placeType === 'attractions'
  //       ? userData.savedAttractions.includes(_id)
  //       : userData.savedRestaurants.includes(_id))
  //   ) {
  //     setisFavorite(true);
  //   } else {
  //     setisFavorite(false);
  //   }
  // };

  // const handleClick = async () => {
  //   if (!isAuthenticated) {
  //     return router.push('/signin');
  //   }
  //   try {
  //     if (isFavorite) {
  //       await usersSavesDelete(_id, placeType === 'attractions' ? 'Attraction' : 'Restaurant');
  //     } else {
  //       await usersSaves(_id, placeType === 'attractions' ? 'Attraction' : 'Restaurant');
  //     }
  //     setisFavorite((isFavorite) => !isFavorite);
  //   } catch (error) {
  //     console.error('Error fetching attractions:', error);
  //   }
  // };

  // useEffect(() => {
  //   initialCheck();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return (
    <Card
      elevation={1}
      sx={{ borderRadius: 2, maxHeight: 350, mb: 4 }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <Box sx={{ height: 200, mb: 1 }}>
            <CardMedia
              sx={{ height: '100%' }}
              component={RouterLink}
              href={path}
              image={
                imageUrl ??
                `https://loremflickr.com/640/480/restaurant,food?random=${Math.random()}`
              }
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Box sx={{ whiteSpace: 'normal', mb: 0.5, paddingX: 1 }}>
            <Typography variant="h6">
              <Link
                color="text.primary"
                component={RouterLink}
                href={path}
                underline="none"
                fontSize={16}
                fontWeight={500}
              >
                {name}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              height: 50,
              overflow: 'hidden',
              whiteSpace: 'normal',
              mb: 1,
              paddingX: 1,
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              fontSize="16px"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {truncateText(description, 90)}
            </Typography>
          </Box>
        </Grid>

        <Grid container>
          <Grid
            item
            xs={6}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <LikeIconButton
                id={_id}
                placeType={type}
                withText={false}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Rating
                data-testid="rating-element"
                name="size-small"
                value={overAllRating}
                size="medium"
                precision={0.1}
                readOnly
                sx={{ mt: 1, mr: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PlaceCard;
