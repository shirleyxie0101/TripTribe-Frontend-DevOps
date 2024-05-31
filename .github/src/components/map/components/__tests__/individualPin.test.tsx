import { render, screen } from '@testing-library/react';

import { Pin } from '../individualPin';
import { pinIconColor, pinIconList } from '../pinIconProps';

const restaurantType = 'Restaurant';
const restaurantIcon = pinIconList['Restaurant'];
const restaurantColor = pinIconColor['Restaurant'];
const attractionType = 'Attraction';
const attractionIcon = pinIconList['Attraction'];
const attractionColor = pinIconColor['Attraction'];

describe('individualPin', () => {
  it('Should be rendered on the page', () => {
    render(
      <Pin
        id={'Test Pin'}
        placeType={restaurantType}
        placeIcon={restaurantIcon}
        placeColor={restaurantColor}
      />
    );
    const mapMarker = screen.getByLabelText('Map Pin');
    expect(mapMarker).toBeInTheDocument();
  });
  it('should render an icon in the page', () => {
    render(
      <Pin
        id={'Test Pin'}
        placeType={attractionType}
        placeIcon={attractionIcon}
        placeColor={attractionColor}
      />
    );
    const mapMarker = screen.getByTestId('PhotoCameraOutlinedIcon');
    expect(mapMarker).toBeInTheDocument();
  });
});
