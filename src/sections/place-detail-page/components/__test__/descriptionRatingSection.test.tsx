import { render, screen } from '@testing-library/react';
import React from 'react';

import { PlaceRatings } from '../place-ratings';

type RatingDistributionType = {
  count: number;
  rating: number;
};
jest.mock('../place-ratings', () => {
  return jest.fn(() => (
    <div data-testid="rating-card">
      <p>Mocked ratingDistributionCard</p>
    </div>
  ));
});

jest.mock('../place-reviews/place-reviews', () => {
  const mockReview = () => <div />;
  return mockReview;
});

describe.skip('rating distribution in description section of detail page', () => {
  const mockData: RatingDistributionType[] = [
    {
      count: 5,
      rating: 5,
    },
    {
      count: 6,
      rating: 4,
    },
    {
      count: 6,
      rating: 3,
    },
    {
      count: 6,
      rating: 2,
    },
    {
      count: 7,
      rating: 1,
    },
  ];
  it('renders DetailPageDescription with data', async () => {
    const { getByTestId } = render(
      <PlaceRatings
        placeData={}
        ratingData={mockRatingData}
        ratingError={}
        ratingTotalCount={}
      />
    );
    const detailPageDescription = getByTestId('page-description');
    expect(detailPageDescription).toBeInTheDocument();
    const ratingCard = getByTestId('rating-card');
    expect(ratingCard).toBeInTheDocument();
  });
  it('renders Loading... when isLoading is true and data is empty array', () => {
    render(
      <PlaceRatings
        placeData={}
        ratingData={mockRatingData}
        ratingError={}
        ratingTotalCount={}
      />
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
  test('renders error message when error prop is provided', () => {
    const mockError = { response: { data: { exceptionMessage: 'Error message' } } };
    render(
      <PlaceRatings
        placeData={}
        ratingData={mockRatingData}
        ratingError={}
        ratingTotalCount={}
      />
    );
    const errorElement = screen.getByText('Error message');
    expect(errorElement).toBeInTheDocument();
  });
});
