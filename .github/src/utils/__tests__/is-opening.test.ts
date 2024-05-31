import dayjs, { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { PlaceProps } from '@/types/attractions-restaurants';
import { isOpening } from '@/utils/is-opening';
const mockShopOpeningHourList = {
  mondayNormalOpen: {
    openHours: {
      Monday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '01:00',
            closeTime: '24:00',
          },
        ],
      },
    },
    address: {
      formattedAddress: '6047 MacGyver Streets Suite 232',
      location: {
        lat: 86.2763,
        lng: 57.9298,
      },
    },
  },

  mondayEarlyClose: {
    openHours: {
      Monday: {
        isOpenAllDay: false,
        isClosed: false,
        period: [
          {
            openTime: '09:00',
            closeTime: '10:00',
          },
        ],
      },
    },
    address: {
      formattedAddress: '6047 MacGyver Streets Suite 232',
      location: {
        lat: 86.2763,
        lng: 57.9298,
      },
    },
  },
  mondayAllOpen: {
    openHours: {
      Monday: {
        isOpenAllDay: true,
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
      formattedAddress: '6047 MacGyver Streets Suite 232',
      location: {
        lat: 86.2763,
        lng: 57.9298,
      },
    },
  },
  mondayAllClose: {
    openHours: {
      Monday: {
        isOpenAllDay: false,
        isClosed: true,
        period: [
          {
            openTime: '06:00',
            closeTime: '18:00',
          },
        ],
      },
    },
    address: {
      formattedAddress: '6047 MacGyver Streets Suite 232',
      location: {
        lat: 86.2763,
        lng: 57.9298,
      },
    },
  },
};

extend(customParseFormat);

jest.mock('@/utils/get-current-date-time', () => ({
  //"2011-10-16T16:17:56.406Z"
  getLocalTime: jest.fn(() => dayjs(1318781876406)),
  getCurrentWeekday: jest.fn(() => 'Monday'),
}));

jest.mock('tz-lookup', () => jest.fn(() => 'America/New_York'));

describe('isOpening', () => {
  it('Should return an opening msg when receive a normal working hours', () => {
    const openingState = isOpening(mockShopOpeningHourList.mondayNormalOpen as PlaceProps);
    expect(openingState).toBe('Opening');
  });
  it('Should return a close msg when receive an early close working hours', () => {
    const openingState = isOpening(mockShopOpeningHourList.mondayEarlyClose as PlaceProps);
    expect(openingState).toBe('Closed');
  });

  it('Should return an all open msg when receive an all open days', () => {
    const openingState = isOpening(mockShopOpeningHourList.mondayAllOpen as PlaceProps);
    expect(openingState).toBe('Opening All Day');
  });

  it('Should return an all close msg when receive an all close day', () => {
    const openingState = isOpening(mockShopOpeningHourList.mondayAllClose as PlaceProps);
    expect(openingState).toBe('Closed Temporarily');
  });
});
