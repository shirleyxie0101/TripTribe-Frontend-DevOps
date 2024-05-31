import { render, userEvent, waitFor } from '@testing-library/react';
import React from 'react';
import useSWR from 'swr';

import axiosInstance from '@/utils/request';

import FavoritesCard from '../FavoritesCard';

// Mocking axiosInstance.delete
jest.mock('@/utils/request', () => ({
  delete: jest.fn(),
}));

// Mocking useSWR
jest.mock('swr', () => jest.fn());

describe('FavoritesCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Favorite Restaurants', () => {
    it('renders favorite restaurants with error report', async () => {
      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Restaurant')) {
          return {
            data: null,
            isLoading: false,
            error: { message: 'Error fetching data' },
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Restaurants')).toBeInTheDocument();
      expect(getByText('Error fetching data')).toBeInTheDocument();
    });

    it('renders favorite restaurants without data', async () => {
      useSWR.mockImplementation((url, fetcher, options) => {
        if (url === '/Restaurant') {
          return {
            data: [],
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Restaurants')).toBeInTheDocument();
      expect(getByText('No Favorite Restaurants yet, let us change that!')).toBeInTheDocument();
    });

    it('renders favorite restaurants with data', async () => {
      const mockRestaurantData = [
        {
          _id: '1',
          name: 'Restaurant 1',
          description: 'Description of Restaurant 1',
          photos: [{ imageUrl: 'https://example.com/image1.jpg', _id: '1' }],
          overAllRating: 4.5,
        },
      ];

      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Restaurant')) {
          return {
            data: mockRestaurantData,
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Restaurants')).toBeInTheDocument();
      expect(getByText('Restaurant 1')).toBeInTheDocument();
    });

    it('calls handleDeleteMyRestaurant when delete button is clicked', () => {
      const mockRestaurantData = [
        {
          _id: '1',
          name: 'Restaurant 1',
          description: 'Description of Restaurant 1',
          photos: [{ imageUrl: 'https://example.com/image1.jpg', _id: '1' }],
          overAllRating: 4.5,
        },
      ];

      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Restaurant')) {
          return {
            data: mockRestaurantData,
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />,
        { wrapper: MemoryRouter }
      );

      // Find the delete button
      const deleteButton = getByText('Delete');

      // Click the delete button
      userEvent.click(deleteButton);

      // Expect axiosInstance.delete to have been called with the correct arguments
      expect(axiosInstance.delete).toHaveBeenCalledWith('/users/me/saves/Restaurant/1');
    });

    it('routes to /restaurants when "Start finding your favorite restaurant" button is clicked', () => {
      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />,
        { wrapper: MemoryRouter }
      );

      // Find the button
      const startFindingButton = getByText('Start finding your favorite restaurant');

      // Click the button
      userEvent.click(startFindingButton);

      // Expect to navigate to /restaurants
      expect(window.location.pathname).toBe('/restaurants');
    });
  });

  describe('Favorite Attractions', () => {
    it('renders favorite attractions with error report', async () => {
      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Attraction')) {
          return {
            data: null,
            isLoading: false,
            error: { message: 'Error fetching data' },
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Attractions')).toBeInTheDocument();
      expect(getByText('Error fetching data')).toBeInTheDocument();
    });

    it('renders favorite attractions without data', async () => {
      useSWR.mockImplementation((url, fetcher, options) => {
        if (url === '/Attraction') {
          return {
            data: [],
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Attractions')).toBeInTheDocument();
      expect(getByText('No Favorite Attraction yet, let us change that!')).toBeInTheDocument();
    });

    it('renders favorite attractions with data', async () => {
      const mockAttractionData = [
        {
          _id: '1',
          name: 'Attraction 1',
          description: 'Description of Attraction 1',
          photos: [{ imageUrl: 'https://example.com/image1.jpg', _id: '1' }],
          overAllRating: 4.5,
        },
      ];

      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Attraction')) {
          return {
            data: mockAttractionData,
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />
      );

      expect(getByText('Favorite Attractions')).toBeInTheDocument();
      expect(getByText('Attraction 1')).toBeInTheDocument();
    });

    it('calls handleDeleteMyAttraction when delete button is clicked', () => {
      const mockAttractionData = [
        {
          _id: '1',
          name: 'Attraction 1',
          description: 'Description of Attraction 1',
          photos: [{ imageUrl: 'https://example.com/image1.jpg', _id: '1' }],
          overAllRating: 4.5,
        },
      ];

      useSWR.mockImplementation((url, fetcher, options) => {
        if (url.includes('/Attraction')) {
          return {
            data: mockAttractionData,
            isLoading: false,
            error: null,
            mutate: jest.fn(),
          };
        }
        return null;
      });

      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />,
        { wrapper: MemoryRouter }
      );

      // Find the delete button
      const deleteButton = getByText('Delete');

      // Click the delete button
      userEvent.click(deleteButton);

      // Expect axiosInstance.delete to have been called with the correct arguments
      expect(axiosInstance.delete).toHaveBeenCalledWith('/users/me/saves/Attraction/1');
    });

    it('routes to /attractions when "Start finding your favorite attraction" button is clicked', () => {
      const { getByText } = render(
        <FavoritesCard
          isMe={true}
          userId="123"
        />,
        { wrapper: MemoryRouter }
      );

      // Find the button
      const startFindingButton = getByText('Start finding your favorite attraction');

      // Click the button
      userEvent.click(startFindingButton);

      // Expect to navigate to /attractions
      expect(window.location.pathname).toBe('/attractions');
    });
  });
});
