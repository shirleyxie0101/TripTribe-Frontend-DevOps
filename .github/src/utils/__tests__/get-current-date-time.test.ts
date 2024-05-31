// getCurrentWeekday: when no input, return current weekday in full name
// getCurrentWeekday: when have input, return the weekday of the future day

import { getCurrentWeekday, getLocalTime } from '@/utils/get-current-date-time';

describe('getLocalTime', () => {
  it('Should return the current time of the location when receive timezone', () => {
    const timezone = 'America/New_York';
    const timeStamp = 1318781876406;
    const dateResult = getLocalTime(timezone, timeStamp);
    expect(dateResult).toBeDefined();
    expect(dateResult.year()).toBe(2011);
    expect(dateResult.month()).toBe(9);
    expect(dateResult.date()).toBe(16);
  });
});

describe('getCurrentWeekday', () => {
  const timezone = 'America/New_York';
  const timeStamp = 1318781876406;

  it('Should return current weekday when second parameter is empty', () => {
    const dateResult = getCurrentWeekday(timezone, undefined, timeStamp);
    expect(dateResult).toBeDefined();
    expect(dateResult).toBe('Sunday');
  });
  it('Should return current plus/minus weekday when second parameter is provided', () => {
    const plusDay = 1;
    const minusDay = -1;
    const theNextDay = getCurrentWeekday(timezone, plusDay, timeStamp);
    const theDayBefore = getCurrentWeekday(timezone, minusDay, timeStamp);
    expect(theNextDay).toBeDefined();
    expect(theNextDay).toBe('Monday');
    expect(theDayBefore).toBeDefined();
    expect(theDayBefore).toBe('Saturday');
  });
});
