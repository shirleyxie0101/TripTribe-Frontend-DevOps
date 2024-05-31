import { render, screen } from '@testing-library/react';

import { Creator, Review, ReviewPhoto } from '@/types/review';

import ReviewCard from '../place-reviews/components/review-card';

jest.mock('../place-reviews/components/gallery', () => {
  return jest.fn(() => (
    <div data-testid="gallery">
      <div>Mocked Gallery</div>
    </div>
  ));
});

jest.mock('dangerously-set-html-content', () => {
  return jest.fn(() => (
    <div data-testid="photoswipe">
      <div>mocked photoswipe</div>
    </div>
  ));
});

describe('Review card', () => {
  describe('User avatar and nickname', () => {
    it('should render user avatar if avatar url exists', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '',
              placeType: '',
              creator: {
                _id: '1',
                nickname: '',
                userAvatar: {
                  imageAlt: 'abc',
                  imageUrl: 'abc',
                },
              },
            } as Review
          }
        />
      );
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should render user first letter of their nickname if avatar url not exists', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '',
              placeType: '',
              creator: {
                _id: '1',
                nickname: 'Jack',
                userAvatar: {
                  imageAlt: '',
                  imageUrl: '',
                },
              },
            } as Review
          }
        />
      );
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveTextContent('J');
    });

    it('should render letter "U" if neither avatar url nor nickname exists', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '',
              placeType: '',
              creator: {
                _id: '1',
                nickname: '',
                userAvatar: {
                  imageAlt: '',
                  imageUrl: '',
                },
              },
            } as Review
          }
        />
      );
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveTextContent('U');
    });
  });

  it('should render user nickname if it exists', () => {
    render(
      <ReviewCard
        review={
          {
            _id: '1',
            title: '',
            description: '',
            rating: 1,
            photos: [] as ReviewPhoto[],
            updatedAt: '',
            placeType: '',
            creator: {
              _id: '1',
              nickname: 'Jack',
              userAvatar: {
                imageAlt: 'abc',
                imageUrl: 'abc',
              },
            },
          } as Review
        }
      />
    );
    const username = screen.getByTestId('user-nickname');
    expect(username).toHaveTextContent('Jack');
  });

  describe('user review', () => {
    it('should render date of the review', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '01/01/2024',
              placeType: '',
              creator: {} as Creator,
            } as Review
          }
        />
      );
      const date = screen.getByTestId('date');
      expect(date).toHaveTextContent('01/01/2024');
    });

    it('should render a formatted date of the review', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '01/01/24',
              placeType: '',
              creator: {} as Creator,
            } as Review
          }
        />
      );
      const date = screen.getByTestId('date');
      expect(date).toHaveTextContent('01/01/2024');
    });

    it('should render an empty dom if the date is not a date type that cannot be validate by dayjs', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: '',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: 'abc',
              placeType: '',
              creator: {} as Creator,
            } as Review
          }
        />
      );
      const date = screen.getByTestId('date');
      expect(date).toBeEmptyDOMElement();
    });

    it('should render a description if it exists', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: 'abc',
              rating: 1,
              photos: [] as ReviewPhoto[],
              updatedAt: '',
              placeType: '',
              creator: {} as Creator,
            } as Review
          }
        />
      );
      const description = screen.getByTestId('description');
      expect(description).toBeInTheDocument();
    });

    it('should render gallery if there exists photo', () => {
      render(
        <ReviewCard
          review={
            {
              _id: '1',
              title: '',
              description: 'abc',
              rating: 1,
              photos: new Array(3) as ReviewPhoto[],
              updatedAt: '',
              placeType: '',
              creator: {} as Creator,
            } as Review
          }
        />
      );
      const gallery = screen.getByTestId('gallery');
      expect(gallery).toBeInTheDocument();
    });
  });
});
