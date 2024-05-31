import { Address } from './address';
import { BusinessTime } from './business-time';
import { MainTypeCapital } from './general';
import { Photo } from './photo';

export type PlaceProps = {
  _id: string;
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  openHours: {
    Monday: BusinessTime;
    Tuesday: BusinessTime;
    Wednesday: BusinessTime;
    Thursday: BusinessTime;
    Friday: BusinessTime;
    Saturday: BusinessTime;
    Sunday: BusinessTime;
  };
  address: Address;
  overAllRating: number;
  photos: Photo[];
  createdUserId: string;
  type: MainTypeCapital;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  distance?: number;
} & {
  [key: string]: string | object | number;
};
