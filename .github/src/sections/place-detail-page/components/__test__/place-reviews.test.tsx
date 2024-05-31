import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import router from 'next/router';
import mockRouter from 'next-router-mock';

import { PageDataResponse } from '@/types/general';
import { Creator, Review, ReviewPhoto } from '@/types/review';

import PlaceReviews from '../place-reviews/place-reviews';

const mockWriteReview = jest.fn(() => {
  router.push({
    pathname: '/createReview',
    query: {
      placeId: 'a',
      placeType: 'b',
    },
  });
});
const mockHandleReviewsPageChange = jest.fn();
const mockedReviews = [
  {
    _id: '1',
    title: '',
    description: '',
    rating: 1,
    photos: [] as ReviewPhoto[],
    updatedAt: '',
    placeType: '',
    creator: {} as Creator,
  },
  {
    _id: '2',
    title: '',
    description: '',
    rating: 1,
    photos: [] as ReviewPhoto[],
    updatedAt: '',
    placeType: '',
    creator: {} as Creator,
  },
  {
    _id: '3',
    title: '',
    description: '',
    rating: 1,
    photos: [] as ReviewPhoto[],
    updatedAt: '',
    placeType: '',
    creator: {} as Creator,
  },
  {
    _id: '4',
    title: '',
    description: '',
    rating: 1,
    photos: [] as ReviewPhoto[],
    updatedAt: '',
    placeType: '',
    creator: {} as Creator,
  },
];

jest.mock('../place-reviews/components/review-card', () => {
  return jest.fn(() => (
    <div data-testid="review-card">
      <div>Mocked ReviewCard</div>
    </div>
  ));
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Place reviews', () => {
  describe('Render reviews', () => {
    it('should render heading "reviews"', () => {
      render(
        <PlaceReviews
          reviewPaginationData={{} as PageDataResponse<Review[]>}
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const text = screen.getByTestId('review');
      expect(text).toHaveTextContent(/review/i);
    });

    it('should show correct number of reviews in heading', () => {
      render(
        <PlaceReviews
          reviewPaginationData={
            {
              data: new Array(25) as Review[],
              skip: 0,
              limit: 30,
              total: 25,
              pageCount: 1,
            } as PageDataResponse<Review[]>
          }
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const text = screen.getByTestId('review');
      expect(text).toHaveTextContent(/25/i);
    });

    it('should show "Please left your review" if reviews data is an empty array', () => {
      render(
        <PlaceReviews
          reviewPaginationData={
            { data: [], skip: 0, limit: 30, total: 30, pageCount: 1 } as PageDataResponse<Review[]>
          }
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const text = screen.getByTestId('review-content');
      expect(text).toHaveTextContent(/Please left your review/i);
    });

    it('should show correct number of review cards', () => {
      render(
        <PlaceReviews
          reviewPaginationData={
            {
              data: mockedReviews,
              skip: 0,
              limit: 30,
              total: 4,
              pageCount: 1,
            } as PageDataResponse<Review[]>
          }
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const reviewCardsArr = screen.getAllByTestId('review-card');
      expect(reviewCardsArr.length).toBe(4);
    });

    it('should show the correct number of page count in pagination', () => {
      render(
        <PlaceReviews
          reviewPaginationData={
            {
              data: new Array(30) as Review[],
              skip: 60,
              limit: 30,
              total: 90,
              pageCount: 3,
            } as PageDataResponse<Review[]>
          }
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={3}
        />
      );
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveTextContent('3');
      expect(pagination).not.toHaveTextContent('4');
    });
  });

  describe('click button "write review"', () => {
    it('should call writeReview when button clicked', async () => {
      render(
        <PlaceReviews
          reviewPaginationData={{} as PageDataResponse<Review[]>}
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const button = screen.getByTestId('write-review-btn');
      await userEvent.click(button);
      console.log(global.window.location.pathname);
      expect(mockWriteReview).toHaveBeenCalled();
    });

    it('should go to url"/createReview" on button clicked', async () => {
      render(
        <PlaceReviews
          reviewPaginationData={{} as PageDataResponse<Review[]>}
          reviewError={undefined}
          reviewIsLoading={false}
          writeReview={mockWriteReview}
          handleReviewsPageChange={mockHandleReviewsPageChange}
          page={1}
        />
      );
      const button = screen.getByTestId('write-review-btn');
      await userEvent.click(button);
      expect(mockRouter).toMatchObject({
        pathname: '/createReview',
        query: {
          placeId: 'a',
          placeType: 'b',
        },
      });
    });
  });
});
