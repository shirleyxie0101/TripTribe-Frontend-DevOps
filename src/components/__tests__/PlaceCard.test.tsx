import { render, screen } from '@testing-library/react';
import React from 'react';

import PlaceCard from '@/components/PlaceCard';

describe('PlaceCard component', () => {
  const defaultProps = {
    _id: 'asdasdasdasd123',
    name: 'sample',
    description: 'long description',
    imageUrl: '/assets/operahouse01.png',
    title: 'Test Title',
    comment: 'Test Comment',
    overAllRating: 3,
    placeType: 'Restaurant',
  };

  test('renders PlaceCard component with provided props', () => {
    render(<PlaceCard {...defaultProps} />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();

    const commentElement = screen.getByText('Test Comment');
    expect(commentElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('Test Title');
    expect(imageElement).toBeInTheDocument();

    const ratingElement = screen.getByRole('img', { name: /3 Stars/ });

    const ratingValue = ratingElement.getAttribute('aria-label');

    expect(ratingValue).toBe('3 Stars');
  });
});
