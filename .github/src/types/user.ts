export type User = {
  _id: string;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  description: string;
  role: UserRole;
  savedAttractions: SavedAttractions;
  savedRestaurants: SavedRestaurants;
  userAvatar: UserAvatar;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export type SavedAttractions = string[];
export type SavedRestaurants = string[];
export type UserAvatar = {
  imageAlt: string;
  imageUrl: string;
  imageType: string;
  uploadUserId: string;
  _id: string;
  __v: number;
};
