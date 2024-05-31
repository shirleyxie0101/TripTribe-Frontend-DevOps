import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { UserTab } from '@/constants/userProfilePage';
import { UserRole } from '@/types/user';

import TabPanel from '../TabPanel';

jest.mock('../ReviewsCard', () => {
  const mockReviewCard = () => <div>this is reviews card</div>;
  return mockReviewCard;
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('TabPanel Component', () => {
  const mockUser = {
    _id: '12345',
    email: 'linfei@123.com',
    nickname: 'linfei',
    firstName: 'tester',
    lastName: 'unit',
    description: 'unit test',
    userAvatar: {
      imageAlt: 'imageAlt',
      imageUrl: 'imageUrl',
      imageType: 'imageType',
      uploadUserId: 'uploadUserId',
      _id: '_id',
      __v: 1,
    },
    role: 'admin' as UserRole,
    savedAttractions: ['SavedAttractions'],
    savedRestaurants: ['SavedRestaurants'],
    createdAt: '1',
    updatedAt: '2',
    __v: 1,
  };

  it('renders all tabs', () => {
    render(
      <TabPanel
        user={mockUser}
        isMe={true}
        userId={'me'}
        currentTab={UserTab.General}
      />
    );

    expect(screen.getByText('general')).toBeInTheDocument();
    expect(screen.getByText('favorites')).toBeInTheDocument();
    expect(screen.getByText('reviews')).toBeInTheDocument();
    expect(screen.getByText('security')).toBeInTheDocument();
  });

  it('renders public tabs only', () => {
    const securityTab = screen.queryByText('security');

    const mockOtherUserId = '65fae57cdfc1b14d8a21bcca';

    render(
      <TabPanel
        user={mockUser}
        isMe={false}
        userId={mockOtherUserId}
        currentTab={UserTab.General}
      />
    );
    expect(securityTab).not.toBeInTheDocument();
  });

  it('changes to General card when tab is clicked', async () => {
    render(
      <TabPanel
        user={mockUser}
        isMe={true}
        userId={'me'}
        currentTab={UserTab.General}
      />
    );
    await userEvent.click(screen.getByText('general'));
    expect(screen.getByText('Personal info')).toBeInTheDocument();
  });

  it('changes to Favorites card when tab is clicked', async () => {
    render(
      <TabPanel
        user={mockUser}
        isMe={true}
        userId={'me'}
        currentTab={UserTab.Favorites}
      />
    );
    await userEvent.click(screen.getByText('favorites'));
    expect(screen.getByText('Favorite Restaurants')).toBeInTheDocument();
    expect(screen.getByText('Favorite Attractions')).toBeInTheDocument();
  });
});
