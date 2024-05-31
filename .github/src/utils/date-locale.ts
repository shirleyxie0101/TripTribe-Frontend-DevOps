import type { FormatRelativeFnOptions, FormatRelativeToken, Locale } from 'date-fns';
import locale from 'date-fns/locale/en-US';

const formatDistanceLocale: Record<string, string> = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

export const customLocale: Locale = {
  ...locale,
  formatDistance: (token, count, options) => {
    options = options || {};

    const result = formatDistanceLocale[token].replace('{{count}}', count.toString());

    if (options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  },
  code: '',
  formatRelative: function <DateType extends Date>(
    token: FormatRelativeToken,
    date: DateType,
    baseDate: DateType,
    options?: FormatRelativeFnOptions | undefined
  ): string {
    throw new Error('Function not implemented.');
  },
  localize: undefined as never,
  formatLong: undefined as never,
  match: undefined as never,
};
