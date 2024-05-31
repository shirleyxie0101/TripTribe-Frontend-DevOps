// import { render, screen } from '@testing-library/react';
// import React from 'react';

// import { PlaceRatings } from '../place-ratings';
// type RatingDistributionType = {
//   count: number;
//   rating: number;
// };
// // mock useRequest
// jest.mock('');

// describe.skip('RatingDistribution', () => {
//   const mockData: RatingDistributionType[] = [
//     {
//       count: 5,
//       rating: 5,
//     },
//     {
//       count: 6,
//       rating: 4,
//     },
//     {
//       count: 6,
//       rating: 3,
//     },
//     {
//       count: 6,
//       rating: 2,
//     },
//     {
//       count: 7,
//       rating: 1,
//     },
//   ];
//   it('renders RatingDistribution with data', () => {
//     render(<PlaceRatings ratingData={mockData} />);
//     // Test average rating
//     const avgRatingElement = screen.getByText('Rating 2.9');
//     expect(avgRatingElement).toBeInTheDocument();
//     const starsElement = screen.getByTestId('rating');
//     expect(starsElement).toBeInTheDocument();

//     // Test individual ratings
//     mockData.forEach((rating: any, index: number) => {
//       const ratingStarText = screen.getByText(`${rating.rating} Stars`);
//       expect(ratingStarText).toBeInTheDocument();
//       const progressBarElement = screen.getByTestId(`linearProgress-${index}`);
//       expect(progressBarElement).toBeInTheDocument();
//     });
//     const percentageElement1 = screen.getAllByText('20%');
//     expect(percentageElement1.length).toBe(3);
//     const percentageElement2 = screen.getByText('17%');
//     expect(percentageElement2).toBeInTheDocument();
//     const percentageElement3 = screen.getByText('23%');
//     expect(percentageElement3).toBeInTheDocument();
//   });
// });
