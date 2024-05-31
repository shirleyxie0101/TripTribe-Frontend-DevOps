import dayjs, { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import tzlookup from 'tz-lookup';

import { PlaceProps } from '@/types/attractions-restaurants';
import { OpeningStatus } from '@/types/business-time';

import { getCurrentWeekday, getLocalTime } from './get-current-date-time';

extend(customParseFormat);
extend(isBetween);
export const isOpening = (popupInfo: PlaceProps): OpeningStatus => {
  // the weekday is consist between localTime and weekday.
  const timeZone = tzlookup(popupInfo.address.location.lat, popupInfo.address.location.lng);
  const weekday = getCurrentWeekday(timeZone);

  if (popupInfo.openHours[weekday].isClosed) {
    return 'Closed Temporarily';
  }
  if (popupInfo.openHours[weekday].isOpenAllDay) {
    return 'Opening All Day';
  }
  const localTime = getLocalTime(timeZone);

  const { openTime, closeTime } = popupInfo.openHours[weekday].period[0];
  // parse Dayjs obj to string for unify the result
  const localTimeString = dayjs(localTime).format('H:mm');
  // convert time string to time obj
  const localTimeParsed = dayjs(localTimeString, 'H:mm');
  const openTimeParsed = dayjs(openTime, 'H:mm');
  const closeTimeParsed = dayjs(closeTime, 'H:mm');

  const isOpeningNow = dayjs(localTimeParsed).isBetween(openTimeParsed, closeTimeParsed)
    ? 'Opening'
    : 'Closed';
  return isOpeningNow;
};
