import { render } from '@testing-library/react';
import React from 'react';

import HomepageList, { ImageData } from '../HomepageList';

jest.mock('../HomepageCard', () => {
  return jest.fn((props) => (
    <div data-testid="mocked-homepage-card">
      <p>Mocked HomepageCard</p>
      <p>{props.title}</p>
      <p>{props.comment}</p>
      <p>{props.rating}</p>
    </div>
  ));
});

const sampleImageList: ImageData[] = [
  {
    imageSrc: 'image1.jpg',
    title: 'Title 1',
    comment: 'Comment 1',
    rating: 4,
  },
  {
    imageSrc: 'image2.jpg',
    title: 'Title 2',
    comment: 'Comment 2',
    rating: 5,
  },
];

describe('HomepageList component', () => {
  it('renders HomepageList component with mocked HomepageCard', () => {
    const listTitle = 'Sample List';
    const { getByText, getAllByTestId } = render(
      <HomepageList
        listTitle={listTitle}
        imageList={sampleImageList}
      />
    );

    expect(getByText(listTitle)).toBeInTheDocument();

    const mockedHomepageCards = getAllByTestId('mocked-homepage-card');
    expect(mockedHomepageCards.length).toBe(2);

    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Title 2')).toBeInTheDocument();
    expect(getByText('Comment 1')).toBeInTheDocument();
    expect(getByText('Comment 2')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });
});
