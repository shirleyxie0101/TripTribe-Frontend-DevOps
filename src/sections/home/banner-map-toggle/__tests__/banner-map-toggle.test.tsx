import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';

import { BannerMapToggle } from '..'; // Adjust the import path based on your project structure

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('@/sections/home/banner-map-toggle/components/banner-map', () => ({
  __esModule: true,
  BannerMap: () => <div data-testid="Mock Banner Map"></div>,
}));

jest.mock('@/sections/home/banner-map-toggle/components', () => ({
  __esModule: true,
  HeroBanner: () => <div data-testid="Mock Hero Banner"></div>,
}));

describe('BannerMapToggle', () => {
  it('should render BannerMap if urlQuery has "map" set to "shown"', () => {
    mockRouter.query = { map: 'shown' };
    render(<BannerMapToggle mapQueryShown={true} />);

    const bannerMap = screen.getByTestId('Mock Banner Map');
    const heroBanner = screen.queryByTestId('Mock Hero Banner');

    expect(bannerMap).toBeInTheDocument();
    expect(heroBanner).toBeNull();
  });

  it('should render HeroBanner if urlQuery does not have "map" set to "shown"', () => {
    mockRouter.query = {};

    render(<BannerMapToggle mapQueryShown={false} />);
    const bannerMap = screen.queryByTestId('Mock Banner Map');
    const heroBanner = screen.getByTestId('Mock Hero Banner');
    expect(bannerMap).toBeNull();
    expect(heroBanner).toBeInTheDocument();
  });
});
