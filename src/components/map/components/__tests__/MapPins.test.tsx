import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useMapStore } from '@/stores/map-store';
import { PlacesData } from '@/types/map';

import { MapPins } from '../MapPins';

// import { useMapStore } from '@/contexts/map-context';

const mockPinInfo: PlacesData = [
  {
    _id: '65573aebb5ccb958b78ee39a',
    name: 'S 5th Street',
    description:
      'Universe aggredior suffoco calcar. Quisquam earum ipsam quis consequuntur acceptus alo victus. Vulnero corpus abbas sumptus tam anser versus traho patrocinor.',
    website: 'http://stained-thief.info',
    email: 'S5thStreet.DAmore@yahoo.com',
    phone: '956.841.0415 x234',
    openHours: {
      Monday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Tuesday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Wednesday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Thursday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Friday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Saturday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Sunday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
    },
    address: {
      formattedAddress: '536 Mueller Ferry Apt. 633',
      location: {
        lat: -57.8146,
        lng: 10.1117,
      },
    },
    overAllRating: 2.9,
    photos: [
      {
        imageAlt: 'Attraction photo 0',
        imageUrl: 'https://loremflickr.com/640/480/attraction?lock=3594513721327616',
        imageType: 'Attractions',
        uploadUserId: '65562edc184d4aa3bc1c52a7',
        _id: '65573aebb5ccb958b78ee39b',
      },
    ],
    createdUserId: '65562edc184d4aa3bc1c52a7',
    createdAt: '2023-11-17T10:05:31.866Z',
    updatedAt: '2023-11-17T10:05:58.127Z',
    __v: 0,
    distance: 5530835.474964879,
    type: 'Attractions',
  },
  {
    _id: '65573aebb5ccb958b78ee39b',
    name: 'b 6th Street',
    description:
      'Quisquam earum ipsam quis consequuntur acceptus alo victus. Vulnero corpus abbas sumptus tam anser versus traho patrocinor.',
    website: 'http://stained-thief222.info',
    email: 'S5thStreet.DAmore2222@yahoo.com',
    phone: '222.222.0415 x234',
    openHours: {
      Monday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Tuesday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Wednesday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Thursday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Friday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Saturday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
      Sunday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
    },
    address: {
      formattedAddress: '222 Mueller Ferry Apt. 632223',
      location: {
        lat: -58.8146,
        lng: 9.1117,
      },
    },
    overAllRating: 4,
    photos: [
      {
        imageAlt: 'Attraction photo 0',
        imageUrl: 'https://loremflickr.com/640/480/attraction?lock=3594513721327616',
        imageType: 'Attractions',
        uploadUserId: '65562edc184d4aa3bc1c52a8',
        _id: '65573aebb5ccb958b78ee39c',
      },
    ],
    createdUserId: '65562edc184d4aa3bc1c52a8',
    createdAt: '2023-11-17T10:05:31.866Z',
    updatedAt: '2023-11-17T10:05:58.127Z',
    __v: 0,
    distance: 5530836.474964879,
    type: 'Restaurants',
  },
];
const onClickHandler = jest.fn();
jest.mock('react-map-gl', () => {
  return {
    Marker: jest.fn(({ children, color, longitude, latitude, anchor, onClick }) => {
      return <div onClick={onClickHandler}>{children}</div>;
    }),
  };
});

const pinInfoState = {
  highLightedId: '',
  pinInfo: mockPinInfo,
  updatePopupInfo: () => {},
};
const emptyState = {
  highLightedId: '',
  pinInfo: [],
  updatePopupInfo: () => {},
};

describe('Map Pins', () => {
  describe('Pins', () => {
    it('Should be rendered on the page when pinInfo is not empty', () => {
      useMapStore.setState(pinInfoState);
      render(<MapPins />);
      const pins = screen.getAllByTestId(/RestaurantMenuIcon|PhotoCameraOutlinedIcon/);
      expect(pins.length).toBe(2);
    });

    it('Should not be rendered on the page when pinInfo is empty', () => {
      useMapStore.setState(emptyState);
      render(<MapPins />);
      const pins = screen.queryAllByTestId(/RestaurantMenuIcon|PhotoCameraOutlinedIcon/);
      expect(pins.length).toBe(0);
    });
  });
  describe('Click', () => {
    it('Should call the onClickHandler once when be clicked', async () => {
      useMapStore.setState(pinInfoState);
      render(<MapPins />);
      const user = userEvent.setup();
      const attractionPins = screen.getByTestId('PhotoCameraOutlinedIcon');
      await user.click(attractionPins);
      expect(onClickHandler).toHaveBeenCalled();
    });
  });
});
