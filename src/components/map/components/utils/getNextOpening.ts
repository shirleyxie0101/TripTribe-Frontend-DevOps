import tzlookup from 'tz-lookup';

import { PlaceProps } from '@/types/attractions-restaurants';
import { Weekday } from '@/types/business-time';
import { getCurrentWeekday } from '@/utils/get-current-date-time';
const weekList = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as Weekday[];

// only for when closed to find opening.
const findNextOpeningHours = (openingStatus: string, popupInfo: PlaceProps) => {
  // 1. find current weekday
  const weekday = getCurrentWeekday(
    tzlookup(popupInfo.address.location.lat, popupInfo.address.location.lng)
  );

  // 2. find next weekday and find opening hours
  let weekIndex = weekList.findIndex((value) => value === weekday);
  for (let i = 0; i < 7; i++) {
    if (weekIndex === 7) weekIndex -= 7;
    if (popupInfo.openHours[weekList[weekIndex]].isOpenAllDay) {
      return `Open whole day on ${weekList[weekIndex]}`;
    }
    if (popupInfo.openHours[weekList[weekIndex]].period[0].openTime) {
      return `Open at ${popupInfo.openHours[weekList[weekIndex]].period[0].openTime}`;
    }
    weekIndex++;
  }
  return 'Open until further notice';
};

export const getNextOpening = (openingStatus: string, popupInfo: PlaceProps) => {
  // todo when database support
  // 1. get current opening status
  // 2. if close, find next opening time
  //      -> plus 1:      Open at ``
  //      -> plus > 2:    Open at `opening hour` `Weekday`
  //      -> none:        'for further notice'

  // 3. if open, find next closing time
  //      -> plus 0:      Open at ``
  //      -> others:      `24 hours`

  switch (openingStatus) {
    case 'Opening All Day':
      return '24 hours';
    case 'Closed Temporarily':
      return 'Open until further notice';
    // if Opening, means if has opening/closing time
    case 'Opening':
      return `Close at ${
        popupInfo.openHours[
          getCurrentWeekday(
            // tzlookup must be lat at front
            tzlookup(popupInfo.address.location.lat, popupInfo.address.location.lng)
          )
        ].period[0].closeTime
      } `;
    case 'Closed':
      return findNextOpeningHours(openingStatus, popupInfo);
  }
};
