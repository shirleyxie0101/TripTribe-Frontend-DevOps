import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import { Attraction, MainType, Restaurant } from '@/types/general';
import axiosInstance from '@/utils/request';

import PlaceCard from '../../components/PlaceCard';

type FavoritesCardProps = {
  isMe: boolean;
  userId: string | string[] | undefined;
};

export const FavoritesCard: React.FC<FavoritesCardProps> = ({ isMe, userId }) => {
  const restaurantUrl = isMe ? '/users/me/saves/Restaurant' : `/users/${userId}/saves/Restaurant`;
  const attractionUrl = isMe ? '/users/me/saves/Attraction' : `/users/${userId}/saves/Attraction`;

  const fetcher = async (url: string) => await axiosInstance.get(url).then((res) => res.data);

  const {
    data: restaurantsData,
    isLoading: isRestaurantsLoading,
    mutate: restaurantMutate,
  } = useSWR<Restaurant[]>(restaurantUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: attractionsData,
    isLoading: isAttractionsLoading,
    mutate: attractionMutate,
  } = useSWR<Attraction[]>(attractionUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  /**
   * Handle user delete saved restaurant/attraction
   *
   * attempt delete on click
   * if success, show snackbar'success'
   * if unsuccess,show snackbar'fail'
   */
  const handleDeleteMyRestaurant = async (restaurantId: string) => {
    try {
      await axiosInstance.delete(`/users/me/saves/Restaurant/${restaurantId}`);
      restaurantMutate();
      enqueueSnackbar('Delete restaurant successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Fail to delete restaurant, please try again', { variant: 'error' });
    }
  };

  const handleDeleteMyAttraction = async (attractionId: string) => {
    try {
      await axiosInstance.delete(`/users/me/saves/Attraction/${attractionId}`);
      attractionMutate();
      enqueueSnackbar('Delete attraction successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Fail to delete attraction, please try again', { variant: 'error' });
    }
  };

  const hasRestaurantData = restaurantsData && restaurantsData.length > 0;
  const hasAttractionData = attractionsData && attractionsData.length > 0;

  return (
    <Container>
      <Grid
        container
        spacing={4}
        sx={{ display: 'flex', flexDirection: 'col' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
        >
          <Typography
            variant="h6"
            noWrap
          >
            {hasRestaurantData
              ? 'Favorite Restaurants'
              : 'No Favorite Restaurants yet, please change that?'}
          </Typography>
          {!hasRestaurantData && ( // Check if the array is empty
            <Link href="/restaurants">
              <Button
                sx={{ bgcolor: '#009688', color: 'white', mt: 2, borderRadius: '20px' }} // Styling for the button
              >
                Start finding your favorite restaurant
              </Button>
            </Link>
          )}
        </Grid>
        {isRestaurantsLoading ? (
          <CircularProgress size={40} />
        ) : restaurantsData ? (
          restaurantsData.map((item, index) => {
            const restaurantItem = {
              ...item,
              photos: [
                {
                  imageUrl: `https://loremflickr.com/640/480/restaurant,food?random=${index}`,
                  _id: `${index}`,
                },
              ],
              overAllRating: item?.overAllRating || 0,
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <PlaceCard
                  key={index}
                  _id={restaurantItem._id}
                  imageUrl={restaurantItem.photos[0]?.imageUrl}
                  name={restaurantItem.name}
                  description={restaurantItem.description}
                  overAllRating={restaurantItem.overAllRating}
                  placeType={`${MainType.Restaurant}s`}
                />
                {/* user can only access the delete button when they are in their own profile page*/}
                {isMe && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DeleteForeverIcon />}
                    color="error"
                    sx={{
                      display: isMe ? 'flex' : 'none',
                      ml: 'auto',
                      mr: 'auto',
                    }}
                    onClick={() => handleDeleteMyRestaurant(restaurantItem._id)}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            );
          })
        ) : null}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            margin: 'auto',
          }}
        >
          <Typography
            variant="h6"
            noWrap
          >
            {hasAttractionData
              ? 'Favorite Attractions'
              : 'No Favorite Attraction yet, could you please change that?'}
          </Typography>
          {!hasAttractionData && (
            <Link href="/attractions">
              <Button sx={{ bgcolor: '#009688', color: 'white', mt: 2, borderRadius: '20px' }}>
                Start finding your favorite attraction
              </Button>
            </Link>
          )}
        </Grid>
        {isAttractionsLoading ? (
          <CircularProgress size={40} />
        ) : attractionsData ? (
          attractionsData.map((item, index) => {
            const attractionItem = {
              ...item,
              photos: [
                {
                  imageUrl: `https://loremflickr.com/640/480/sydney,attraction?random=${index}`,
                  _id: `${index}`,
                },
              ],
              overAllRating: item?.overAllRating || 0,
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <PlaceCard
                  key={index}
                  _id={attractionItem._id}
                  imageUrl={attractionItem.photos[0]?.imageUrl}
                  name={attractionItem.name}
                  description={attractionItem.description}
                  overAllRating={attractionItem.overAllRating}
                  placeType={`${MainType.Attraction}s`}
                />
                {isMe && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DeleteForeverIcon />}
                    color="error"
                    sx={{
                      display: isMe ? 'flex' : 'none',
                      ml: 'auto',
                      mr: 'auto',
                    }}
                    onClick={() => handleDeleteMyAttraction(attractionItem._id)}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            );
          })
        ) : null}
      </Grid>
    </Container>
  );
};
