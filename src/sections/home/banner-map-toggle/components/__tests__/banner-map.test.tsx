// use next-router-mock package
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { BannerMap } from '../banner-map';

// use next-router-mock to mock next router
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
// use mockRouter to manage router

// need to find a way to mock the map component
jest.mock('@/components/map/map-with-popup', () => ({
  __esModule: true,
  MapWithPopup: jest.fn(({ children }) => <div data-testid="mocked-map"></div>),
}));

describe('Banner Map', () => {
  describe('Close Button', () => {
    it('will update URL', async () => {
      render(<BannerMap />);
      const user = userEvent.setup();
      const closeButton = screen.getByRole('button', { name: 'Close Map' });
      await user.click(closeButton);
      expect(mockRouter.query['map']).not.toBe('shown');
    });
    // it('will update URL', () => {});
  });
  describe('Map rendering', () => {
    it('will be rendered on the component', () => {
      render(<BannerMap />);
      const map = screen.getByTestId('mocked-map');
      expect(map).toBeInTheDocument();
    });
  });
});
