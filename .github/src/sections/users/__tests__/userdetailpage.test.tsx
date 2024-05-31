import { render, screen, waitFor } from '@testing-library/react';
import * as nextRouter from 'next/router';
import useSWR from 'swr';

import UserDetailPage from '../../../pages/users/[userId]/[tab]';

import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/sections/users/TabPanel', () => {
  return jest.fn(() => (
    <div data-testid="mocked-tab-panel">
      <p>Mocked TabPanel</p>
    </div>
  ));
});

describe('UserDetailPage', () => {
  const mockUseRouter = jest.spyOn(nextRouter, 'useRouter');

  it('displays loading state', async () => {
    const mockUserId = '123';
    mockUseRouter.mockReturnValue({
      query: { userId: mockUserId },
    } as any);

    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<UserDetailPage />);

    const loadingElement = await screen.findByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays error state', () => {
    const mockError = { message: 'An error occurred', response: { status: 401 } };
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    render(<UserDetailPage />);
    expect(
      screen.getByText('401: You are not authorized to enter this page, please login first')
    ).toBeInTheDocument();
  });

  it('displays user data on successful fetch', async () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
      error: null,
    });

    render(<UserDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });
  });

  it('renders UserDetailPage with mocked TabPanel', () => {
    const { getByTestId } = render(<UserDetailPage />);
    const tabPanel = getByTestId('mocked-tab-panel');
    expect(tabPanel).toBeInTheDocument();
  });
});
