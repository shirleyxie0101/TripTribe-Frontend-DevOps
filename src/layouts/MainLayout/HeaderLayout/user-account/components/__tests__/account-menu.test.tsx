import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';

import { AccountMenu } from '../account-menu';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('AccountMenu Component', () => {
  it('renders account menu button', () => {
    render(<AccountMenu anchorOffset={10} />);

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    expect(accountButton).toBeInTheDocument();
  });

  it('opens account menu on click', async () => {
    render(<AccountMenu anchorOffset={10} />);

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    await userEvent.click(accountButton);

    const myAccountMenuItem = screen.getByText('My account');
    expect(myAccountMenuItem).toBeInTheDocument();
  });

  it('redirects to My Account page on My Account menu item click', async () => {
    render(<AccountMenu anchorOffset={10} />, { wrapper: MemoryRouterProvider });

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    await userEvent.click(accountButton);

    const myAccountMenuItem = screen.getByText('My account');
    await userEvent.click(myAccountMenuItem);

    expect(mockRouter.asPath).toEqual('/users/me/general');
  });

  it('redirects to Favorites page on Favorites menu item click', async () => {
    render(<AccountMenu anchorOffset={10} />, { wrapper: MemoryRouterProvider });

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    await userEvent.click(accountButton);

    const favoritesMenuItem = screen.getByText('Favorites');
    await userEvent.click(favoritesMenuItem);

    expect(mockRouter.asPath).toEqual('/users/me/favorites');
  });

  it('redirects to Reviews page on Reviews menu item click', async () => {
    render(<AccountMenu anchorOffset={10} />, { wrapper: MemoryRouterProvider });

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    await userEvent.click(accountButton);

    const reviewsMenuItem = screen.getByText('Reviews');
    await userEvent.click(reviewsMenuItem);

    expect(mockRouter.asPath).toEqual('/users/me/reviews');
  });

  it('redirects to Security page on Security menu item click', async () => {
    render(<AccountMenu anchorOffset={10} />, { wrapper: MemoryRouterProvider });

    const accountButton = screen.getByRole('button', { name: 'Account settings' });
    await userEvent.click(accountButton);

    const securityMenuItem = screen.getByText('Security');
    await userEvent.click(securityMenuItem);

    expect(mockRouter.asPath).toEqual('/users/me/security');
  });
});
