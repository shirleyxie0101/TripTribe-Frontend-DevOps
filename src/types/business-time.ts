export type Period = {
  openTime: string;
  closeTime: string;
};

export type BusinessTime = {
  isOpenAllDay: boolean;
  isClosed: boolean;
  period: Period[];
};

export type OpeningStatus = 'Closed Temporarily' | 'Opening All Day' | 'Opening' | 'Closed';
export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
