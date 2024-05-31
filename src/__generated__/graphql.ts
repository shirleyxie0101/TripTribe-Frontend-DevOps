/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  formattedAddress: Scalars['String']['output'];
  location?: Maybe<Location>;
};

export type Attraction = {
  __typename?: 'Attraction';
  _id: Scalars['ID']['output'];
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  createdUserId: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  openHours: OpenHours;
  overAllRating?: Maybe<Scalars['Float']['output']>;
  phone: Scalars['String']['output'];
  photos: Array<Photo>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type AttractionFilterResult = {
  __typename?: 'AttractionFilterResult';
  data: Array<Attraction>;
  limit: Scalars['Float']['output'];
  skip: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type BusinessTime = {
  __typename?: 'BusinessTime';
  isClosed: Scalars['Boolean']['output'];
  isOpenAllDay: Scalars['Boolean']['output'];
  period?: Maybe<Array<Period>>;
};

export type CreateAddressDto = {
  formattedAddress: Scalars['String']['input'];
  location: LocationDto;
};

export type CreateBusinessTimeDto = {
  isClosed: Scalars['Boolean']['input'];
  isOpenAllDay: Scalars['Boolean']['input'];
  period: Array<PeriodDto>;
};

export type CreateOpenHoursDto = {
  Friday: CreateBusinessTimeDto;
  Monday: CreateBusinessTimeDto;
  Saturday: CreateBusinessTimeDto;
  Sunday: CreateBusinessTimeDto;
  Thursday: CreateBusinessTimeDto;
  Tuesday: CreateBusinessTimeDto;
  Wednesday: CreateBusinessTimeDto;
};

export type CreatePhotoDto = {
  imageAlt: Scalars['String']['input'];
  imageType: PhotoType;
  imageUrl: Scalars['String']['input'];
  uploadUserId: Scalars['String']['input'];
};

export type CreateRestaurantDto = {
  address: CreateAddressDto;
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  openHours: CreateOpenHoursDto;
  phone: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReviewDto = {
  description: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  placeType: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

/** Type of Cuisine */
export enum CuisineEnum {
  Asian = 'ASIAN',
  Australian = 'AUSTRALIAN',
  Cafe = 'CAFE',
  Italian = 'ITALIAN'
}

/** Type of Duration */
export enum DurationEnum {
  FourHoursToOneDay = 'FOUR_HOURS_TO_ONE_DAY',
  OneToFourHours = 'ONE_TO_FOUR_HOURS',
  UpToOneHour = 'UP_TO_ONE_HOUR'
}

export type GetAttractionListFiltersDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  currentTime?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  durations?: InputMaybe<Array<DurationEnum>>;
  isOpenNow?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationDto>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  types?: InputMaybe<Array<TypeEnum>>;
};

export type GetAttractionListInput = {
  filters?: InputMaybe<GetAttractionListFiltersDto>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type GetRestaurantListFiltersDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  cuisines?: InputMaybe<Array<CuisineEnum>>;
  currentTime?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  isOpenNow?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationDto>;
  meals?: InputMaybe<Array<MealEnum>>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type GetRestaurantListInput = {
  filters?: InputMaybe<GetRestaurantListFiltersDto>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type Location = {
  __typename?: 'Location';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type LocationDto = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

/** Type of Meal */
export enum MealEnum {
  Breakfast = 'BREAKFAST',
  Brunch = 'BRUNCH',
  Dinner = 'DINNER',
  Lunch = 'LUNCH'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Create restaurant */
  createRestaurant: Restaurant;
  /** Create review */
  createReview: Review;
  /** Delete restaurant */
  deleteRestaurant: Restaurant;
  /** Delete review */
  deleteReview: Review;
  /** Update restaurant */
  updateRestaurant: Restaurant;
  /** Update review */
  updateReview: Review;
};


export type MutationCreateRestaurantArgs = {
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
  input: CreateRestaurantDto;
};


export type MutationCreateReviewArgs = {
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
  input: CreateReviewDto;
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRestaurantArgs = {
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
  id: Scalars['ID']['input'];
  input: UpdateRestaurantGqlDto;
};


export type MutationUpdateReviewArgs = {
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
  id: Scalars['ID']['input'];
  input: UpdateReviewGqlDto;
};

export type OpenHours = {
  __typename?: 'OpenHours';
  Friday: BusinessTime;
  Monday: BusinessTime;
  Saturday: BusinessTime;
  Sunday: BusinessTime;
  Thursday: BusinessTime;
  Tuesday: BusinessTime;
  Wednesday: BusinessTime;
};

export type Period = {
  __typename?: 'Period';
  closeTime: Scalars['String']['output'];
  openTime: Scalars['String']['output'];
};

export type PeriodDto = {
  closeTime: Scalars['String']['input'];
  openTime: Scalars['String']['input'];
};

export type Photo = {
  __typename?: 'Photo';
  _id: Scalars['ID']['output'];
  imageAlt: Scalars['String']['output'];
  imageType: PhotoType;
  imageUrl: Scalars['String']['output'];
  uploadUserId: Scalars['ID']['output'];
};

/** Type of photo */
export enum PhotoType {
  Attraction = 'ATTRACTION',
  Restaurant = 'RESTAURANT',
  Review = 'REVIEW',
  User = 'USER'
}

export type Query = {
  __typename?: 'Query';
  /** Get all attractions or get attractions by filter */
  getAllAttractions: AttractionFilterResult;
  /** Get all restaurants or get restaurants by filter */
  getAllRestaurants: RestaurantFilterResult;
  /** Get all reviews */
  getAllReviews: Array<Review>;
  /** Get ME */
  getMe: User;
  /** Get restaurant by id */
  getOneRestaurant: Restaurant;
  /** Get review by id */
  getOneReview: Review;
  /** Get user by id */
  getOneUser: User;
};


export type QueryGetAllAttractionsArgs = {
  input: GetAttractionListInput;
};


export type QueryGetAllRestaurantsArgs = {
  input: GetRestaurantListInput;
};


export type QueryGetOneRestaurantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOneReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOneUserArgs = {
  id: Scalars['ID']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['ID']['output'];
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  createdUserId: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  openHours: OpenHours;
  overAllRating?: Maybe<Scalars['Float']['output']>;
  phone: Scalars['String']['output'];
  photos: Array<Photo>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type RestaurantFilterResult = {
  __typename?: 'RestaurantFilterResult';
  data: Array<Restaurant>;
  limit: Scalars['Float']['output'];
  skip: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  photos: Array<Photo>;
  placeId: Scalars['ID']['output'];
  placeType: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

/** Type of Type */
export enum TypeEnum {
  FunAndGames = 'FUN_AND_GAMES',
  Museums = 'MUSEUMS',
  NatureAndParks = 'NATURE_AND_PARKS',
  Nightlife = 'NIGHTLIFE',
  SightAndLandmarks = 'SIGHT_AND_LANDMARKS'
}

export type UpdateRestaurantGqlDto = {
  address?: InputMaybe<CreateAddressDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openHours?: InputMaybe<CreateOpenHoursDto>;
  phone?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<CreatePhotoDto>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewGqlDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<CreatePhotoDto>>;
  placeId?: InputMaybe<Scalars['String']['input']>;
  placeType?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  nickname: Scalars['String']['output'];
  role: Scalars['String']['output'];
  savedAttractions?: Maybe<Array<Scalars['ID']['output']>>;
  savedRestaurants?: Maybe<Array<Scalars['ID']['output']>>;
  userAvatar: Photo;
};

export type GetAllAttractionsQueryVariables = Exact<{
  input: GetAttractionListInput;
}>;


export type GetAllAttractionsQuery = { __typename?: 'Query', getAllAttractions: { __typename?: 'AttractionFilterResult', data: Array<{ __typename?: 'Attraction', _id: string, description: string, name: string, overAllRating?: number | null, photos: Array<{ __typename?: 'Photo', _id: string, imageUrl: string }> }> } };

export type GetAllRestaurantsQueryVariables = Exact<{
  input: GetRestaurantListInput;
}>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: { __typename?: 'RestaurantFilterResult', data: Array<{ __typename?: 'Restaurant', _id: string, description: string, name: string, overAllRating?: number | null, photos: Array<{ __typename?: 'Photo', _id: string, imageUrl: string }> }> } };


export const GetAllAttractionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAttractions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAttractionListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttractions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"overAllRating"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAttractionsQuery, GetAllAttractionsQueryVariables>;
export const GetAllRestaurantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllRestaurants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetRestaurantListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllRestaurants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"overAllRating"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>;