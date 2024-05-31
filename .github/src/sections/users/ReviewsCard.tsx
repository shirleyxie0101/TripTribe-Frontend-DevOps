import { Box, CircularProgress, Divider, Pagination, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { DEFAULT_PAGE_NUMBER, DEFAULT_REVIEW_PAGE_SIZE } from '@/constants/pagination';
import { useUserContext } from '@/contexts/user-context/user-context';
import useRequest from '@/hooks/use-request';
import { PageDataResponse } from '@/types/general';
import { UserReviewResponse } from '@/types/review';
import axiosInstance from '@/utils/request';

import UserReviewCard from './components/user-reviews-card';

export const ReviewsCard: FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { isAuthenticated, userData = null } = useUserContext();

  //handle page change
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  /**
   * request review data from API findAllReviewsByUserId
   * if path === /users/me, get current user data
   * else path === /user/:userId, get this user data
   */
  let queryUserId;
  let isAuthorized = false;

  if (userId === 'me') {
    queryUserId = userData?._id;
    isAuthorized = true;
  } else {
    queryUserId = userId;
    isAuthorized = false;
  }
  const queryUrl = `/users/${queryUserId}/reviews?limit=${DEFAULT_REVIEW_PAGE_SIZE}&skip=${
    (page - 1) * DEFAULT_REVIEW_PAGE_SIZE
  }`;
  const {
    data: respondData,
    isLoading,
    error,
    mutate,
  } = useRequest<PageDataResponse<UserReviewResponse>>(
    queryUserId && page ? { url: queryUrl } : null
  );
  const { data, total, pageCount = 1 } = respondData || {};
  const { creator, reviews } = data || {};

  // delete a review
  const handleDeleteReview = async (reviewDeleteId: string) => {
    // const updatedReview = reviews?.filter((item) => item._id !== reviewDeleteId);
    // const updatedData = { ...data, reviews: updatedReview } as UserReviewResponse;
    await mutate(axiosInstance.delete(`/reviews/${reviewDeleteId}`));
  };

  if (isLoading) {
    return <CircularProgress size={40} />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography>Reviews ({total})</Typography>
      </Box>
      {/* Display reviews if available */}
      {creator && reviews && reviews?.length > 0 ? (
        <>
          {reviews.map((review) => (
            <UserReviewCard
              creator={creator}
              review={review}
              key={review._id}
              onDelete={() => handleDeleteReview(review._id)}
              onEdit={() => {
                const editPath = `/createReview?placeType=${review.placeType.toLowerCase()}&placeId=${
                  review.placeId._id
                }&reviewId=${review._id}`;
                router.push(editPath);
              }}
              isAuthenticated={isAuthenticated}
              isAuthorized={isAuthorized}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pagination
              color="primary"
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              aria-label="custom-pagination"
            />
          </Box>
        </>
      ) : (
        /* Display placeholder if review is not available */
        <Typography
          variant="h6"
          noWrap
        >
          No reviews yet&mdash;let&apos;s change.
        </Typography>
      )}
    </Box>
  );
};
