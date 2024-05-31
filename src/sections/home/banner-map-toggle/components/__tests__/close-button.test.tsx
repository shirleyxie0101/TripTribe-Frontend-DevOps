import { render, screen } from '@testing-library/react';

import { MapCloseButton } from '../CloseButton';

jest.mock('@/hooks/use-router-query', () => ({
  __esModule: true,
  default: () => ({
    urlQuery: { map: 'shown', others: 'otherQuery' },
    setUrlQuery: jest.fn(),
  }),
}));

describe('Close Button', () => {
  it('should be rendered on the page', () => {
    render(<MapCloseButton />);
    const closeButton = screen.getByLabelText('Close Map');
    expect(closeButton).toBeInTheDocument();
  });
  // TODO: why the button does not been clicked?
  // it('should update router when click', async () => {
  //   const user = userEvent.setup();
  //   render(<MapCloseButton />);
  //   const closeButton = screen.getByRole('button');
  //   await user.click(closeButton);
  //   expect(useRouterQuery().setUrlQuery).toHaveBeenCalled();
  // });
});
