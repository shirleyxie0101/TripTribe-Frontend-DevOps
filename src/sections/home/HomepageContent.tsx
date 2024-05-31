import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import React from 'react';

import { GRAPHQL_ATTRACTION_QUERY } from '@/gqls/queries/getAllAttractions.gql';
import { GRAPHQL_RESTAURANT_QUERY } from '@/gqls/queries/getAllRestaurants.gql';

import HomepageList from './HomepageList';

const HomepageContent: React.FC = () => {
  const itemDisplayLimit = 8;

  const {
    data: attractionData,
    error: attractionError,
    loading: isAttractionLoading,
  } = useQuery(GRAPHQL_ATTRACTION_QUERY, {
    variables: { input: { limit: itemDisplayLimit } },
  });
  const attractionsDisplay =
    !attractionData && isAttractionLoading
      ? Array.from(new Array(itemDisplayLimit))
      : attractionData?.getAllAttractions.data || [];

  const {
    data: restaurantData,
    error: restaurantError,
    loading: isRestaurantLoading,
  } = useQuery(GRAPHQL_RESTAURANT_QUERY, {
    variables: { input: { limit: itemDisplayLimit } },
  });

  const restaurantsDisplay =
    !restaurantData && isRestaurantLoading
      ? Array.from(new Array(itemDisplayLimit))
      : restaurantData?.getAllRestaurants.data || [];

  return (
    <Box
      sx={{ '& > *': { my: 10 } }}
      data-testid="homepage-content"
    >
      <HomepageList
        listTitle="Attractions"
        listData={attractionsDisplay}
        error={attractionError}
      />
      <HomepageList
        listTitle="Restaurants"
        listData={restaurantsDisplay}
        error={restaurantError}
      />
    </Box>
  );
};

export default HomepageContent;
