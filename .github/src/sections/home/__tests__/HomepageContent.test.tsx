import { render } from '@testing-library/react';
import React from 'react';

import HomepageContent from '../HomepageContent';

jest.mock('../HomepageList', () => {
  return jest.fn(() => (
    <div data-testid="mocked-homepage-list">
      <p>Mocked HomepageList</p>
    </div>
  ));
});

describe('HomepageContent component', () => {
  it('renders HomepageContent component with mocked HomepageList', () => {
    const { getByTestId } = render(<HomepageContent />);

    const homepageContent = getByTestId('homepage-content');
    expect(homepageContent).toBeInTheDocument();

    const mockedHomepageLists = document.querySelectorAll('[data-testid="mocked-homepage-list"]');
    expect(mockedHomepageLists.length).toBe(2);
    mockedHomepageLists.forEach((list) => {
      expect(list).toBeInTheDocument();
    });
  });
});
