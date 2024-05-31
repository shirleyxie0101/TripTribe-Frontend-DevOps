import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';

import { CircularLoading } from '@/components/CircularLoading';
import { DEFAULT_PAGE_NUMBER, DEFAULT_REVIEW_PAGE_SIZE } from '@/constants/pagination';
import useRequest from '@/hooks/use-request';
import { PlaceDescriptions } from '@/sections/place-detail-page/components/place-descriptions';
import PlaceDetails from '@/sections/place-detail-page/components/place-details';
import { PlacePhotos } from '@/sections/place-detail-page/components/place-photos';
import { PlaceRatings } from '@/sections/place-detail-page/components/place-ratings/place-ratings';
import PlaceReviews from '@/sections/place-detail-page/components/place-reviews/';
import { PlaceProps } from '@/types/attractions-restaurants';
import { PageDataResponse } from '@/types/general';
import { Review } from '@/types/review';
import { capitalizeFirstLetter } from '@/utils/cap-string-first-letter';

import { PlaceLocation } from './components/place-location';
import { PlaceMap } from './components/place-map';

// import Seo from '@/components/seo/Seo';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { SeoProps } from '@/types/seo';

export type RatingDistribution = {
  count: number;
  rating: number;
};
type PlaceContentProps = {};

// export const PlaceContent: React.FC<PlaceContentProps> = ({
//   seoValue,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
export const PlaceContent: React.FC<PlaceContentProps> = () => {
  // const theme = useTheme();
  // const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { pathname, query, isReady } = useRouter();
  const placeType = isReady ? pathname.split('/')[1] : '';
  const placeId = typeof query.id !== 'string' ? '' : query.id;
  const PlaceType = placeType === 'restaurants' ? 'restaurant' : 'attraction';

  const isPlaceReady = placeType && placeId;
  /**
   * once the placeType && placeId is ready, return the request object
   * otherwise it returns null (to prevent SWR sending request)
   * @param  url
   * @returns request object
   */
  const getRequest = (url: string) => (isPlaceReady ? { url } : null);

  const {
    data: placeData,
    error: placeError,
    isLoading: placeIsLoading,
  } = useRequest<PlaceProps>(getRequest(`/${placeType}/${placeId}`));

  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const handleReviewsPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const reviewsURL = `/${placeType}/${placeId}/reviews?limit=${DEFAULT_REVIEW_PAGE_SIZE}&skip=${
    (page - 1) * DEFAULT_REVIEW_PAGE_SIZE
  }`;
  const {
    data: reviewsData,
    isLoading: reviewIsLoading,
    error: reviewError,
  } = useRequest<PageDataResponse<Review[]>>(getRequest(reviewsURL));

  const {
    data: ratingData,
    isLoading: ratingIsLoading,
    error: ratingError,
  } = useRequest<RatingDistribution[]>(getRequest(`/${placeType}/${placeId}/rating-distributions`));

  const writeReview = () => {
    router.push({
      pathname: '/createReview',
      query: {
        placeId: placeId,
        placeType: PlaceType,
      },
    });
  };

  const ratingTotalCount: number = ratingData
    ? ratingData.reduce((acc, ratings) => acc + ratings.count, 0)
    : 0;

  const borderColor = grey[500];

  if (placeIsLoading) {
    return (
      <Box height={1200}>
        <CircularLoading size={80} />
      </Box>
    );
  }
  // if not find from backend
  if (placeError) return <Box height={1200}>{`${placeError.code}: ${placeError.message}`}</Box>;

  if (placeData === undefined) {
    return <Box>404 not found</Box>;
  }

  return (
    <React.Fragment>
      {/* <Seo
        title=""
        description=""
        url=""
        type=""
        name=""
        img=""
      /> */}
      <Box
        mt={1}
        display={'flex'}
        justifyContent={'start'}
        width={1}
      >
        {placeData && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
            >
              Homepage
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/${placeType}`}
            >
              {`${capitalizeFirstLetter(placeType)}`}
            </Link>
            <Typography color="text.primary">{`${placeData.name}`}</Typography>
          </Breadcrumbs>
        )}
      </Box>
      <Grid
        sx={{ mt: 0.25 }}
        container
        spacing={2.5}
      >
        {/* place details */}
        <Grid
          item
          xs={12}
          mt={-1.25}
        >
          <Box
            sx={{
              bgcolor: 'white',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
              px: 2.25,
            }}
          >
            <PlaceDetails
              placeType={placeType}
              placeData={placeData}
              writeReview={writeReview}
              ratingTotalCount={ratingTotalCount}
              id={placeId}
            />
          </Box>
        </Grid>

        {/* place photos */}
        <Grid
          item
          xs={12}
          mt={-1.25}
        >
          <PlacePhotos placeData={placeData} />
        </Grid>

        {/* place location */}
        <Grid
          item
          xs={12}
          md={8}
        >
          <Box
            border={'1px solid'}
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              height: '100%',
              p: 2,
              borderColor: borderColor,
            }}
          >
            <PlaceLocation placeData={placeData} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            sx={{
              height: 225,
              position: 'relative',
              overflow: 'hidden',
              bgcolor: 'white',
              border: '1px solid',
              borderColor: borderColor,
              borderRadius: 1,
            }}
          >
            <PlaceMap placeData={placeData} />
          </Box>
        </Grid>
        {/* place description */}
        <Grid
          item
          xs={12}
        >
          <Box
            id="place-description"
            sx={{
              borderRadius: 1,
              maxWidth: '1200px',
              width: '100%',
              bgcolor: 'white',
              py: 4,
              px: 3,
              border: '1px solid',
              borderColor: borderColor,
            }}
          >
            <PlaceDescriptions placeData={placeData} />
          </Box>
        </Grid>

        {/* place ratings */}
        <Grid
          item
          xs={12}
          md={3}
          height={350}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              height: '100%',
              padding: '10px',
              border: '1px solid',
              borderColor: borderColor,
              position: 'relative',
              minHeight: 300,
            }}
          >
            <PlaceRatings
              placeData={placeData}
              ratingTotalCount={ratingTotalCount}
              ratingData={ratingData}
              ratingError={ratingError}
              ratingIsLoading={ratingIsLoading}
            />
          </Box>
        </Grid>

        {/* place reviews */}
        <Grid
          item
          xs={12}
          md={9}
        >
          <Box
            id="place-review"
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              padding: '10px',
              border: '1px solid',
              borderColor: borderColor,
              position: 'relative',
              minHeight: 300,
              px: 1.625,
            }}
          >
            {reviewsData && (
              <PlaceReviews
                reviewPaginationData={reviewsData}
                reviewError={reviewError}
                reviewIsLoading={reviewIsLoading}
                writeReview={writeReview}
                handleReviewsPageChange={handleReviewsPageChange}
                page={page}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = (async (context) => {
//   console.log('context', context);

//   const seoValue: SeoProps = {
//     title: 'TripTribe Restaurants - Culinary Delights Await',
//     description:
//       'Discover culinary delights with TripTribe Restaurants. Explore a curated list of eateries, backed by transparent ratings and authentic reviews to enhance your dining experience.',
//     url: 'https://www.trip-tribe.com/restaurants',
//     type: 'webapp',
//     name: 'TripTribe',
//     img: '/assets/bridge.png',
//   };

//   return {
//     props: {
//       seoValue,
//     },
//   };
// }) satisfies GetServerSideProps<{
//   seoValue: SeoProps;
// }>;
