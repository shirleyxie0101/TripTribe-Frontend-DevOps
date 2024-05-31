import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HeroBanner } from '..';
// use next-router-mock package
// use next-router-mock to mock next router
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Hero Banner', () => {
  describe('Image', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const bannerImage = screen.getByRole('img', { name: 'Banner Image' });
      expect(bannerImage).toBeInTheDocument();
    });
  });
  describe('map toggle button Button', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const mapToggleButton = screen.getByRole('button', { name: 'Map View' });
      expect(mapToggleButton).toBeInTheDocument();
    });
    it('is disabled after click', async () => {
      render(<HeroBanner />);
      const user = userEvent.setup();
      const mapToggleButton = screen.getByRole('button', { name: 'Map View' });
      await user.click(mapToggleButton);
      expect(mapToggleButton).toBeDisabled();
    });
  });
  describe('Search Bar', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const searchBar = screen.getByPlaceholderText('Search');
      expect(searchBar).toBeInTheDocument();
    });
  });
});
