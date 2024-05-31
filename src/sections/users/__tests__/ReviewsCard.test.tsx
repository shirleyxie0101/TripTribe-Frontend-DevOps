// Import dependencies and the component
import { render, screen, userEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useUserContext } from '@/contexts/user-context/user-context';
import useRequest from '@/hooks/use-request';

import { ReviewsCard } from '../ReviewsCard';

// Mock dependencies
jest.mock('@/contexts/user-context/user-context', () => ({
  useUserContext: jest.fn(),
}));
jest.mock('@/hooks/use-request', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ReviewsCard', () => {
  it('renders loading state', () => {
    // Mock isLoading to true
    useRequest.mockReturnValue({ isLoading: true });
    render(<ReviewsCard />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    // Mock error to true
    useRequest.mockReturnValue({ error: true });
    render(<ReviewsCard />);
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('renders reviews', async () => {
    // Mock data with reviews
    const mockData = {
      data: {
        creator: { name: 'John Doe' },
        reviews: [{ _id: '1', content: 'Great place!' }],
      },
      total: 1,
      pageCount: 1,
    };
    useRequest.mockReturnValue(mockData);
    render(<ReviewsCard />);
    expect(screen.getByText('Reviews (1)')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
  });

  it('renders no reviews message', async () => {
    // Mock data with no reviews
    const mockData = {
      data: { creator: { name: 'John Doe' }, reviews: [] },
      total: 0,
    };
    useRequest.mockReturnValue(mockData);
    render(<ReviewsCard />);
    expect(screen.getByText('No reviews yet&mdash;let&apos;s change.')).toBeInTheDocument();
  });

  it('handles pagination', async () => {
    // Mock data with multiple pages
    const mockData = {
      data: { creator: { name: 'John Doe' }, reviews: [] },
      total: 20,
      pageCount: 4,
    };
    useRequest.mockReturnValue(mockData);
    render(<ReviewsCard />);
    expect(screen.queryByText('No reviews yet&mdash;let&apos;s change.')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Ensure pagination component is rendered
    userEvent.click(screen.getByLabelText('custom-pagination')); // Use unique aria-label
    expect(screen.getByLabelText('custom-pagination')).toBeInTheDocument(); // Ensure unique identifier is present
  });
});
