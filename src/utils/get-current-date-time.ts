import dayjs, { Dayjs, extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Weekday } from '@/types/business-time';
extend(customParseFormat);
extend(utc);
extend(timezone);

type Date = Dayjs | number | undefined;

// get local time
export const getLocalTime = (timeZone: string, date: Date = undefined) => {
  return dayjs(date).tz(timeZone);
};

export const getCurrentWeekday = (
  timeZone: string,
  plusDay: number = 0,
  date: Date = undefined
) => {
  return dayjs(date).tz(timeZone).add(plusDay, 'day').format('dddd') as Weekday;
};
