import { PlaceProps } from './attractions-restaurants';

export interface Creator {
  _id: string;
  nickname: string;
  userAvatar: {
    imageAlt: string;
    imageUrl: string;
  };
}

export interface ReviewPhoto {
  imageAlt: string;
  imageUrl: string;
  imageType: string;
  uploadUserId: string;
  _id: string;
}
export interface Review {
  _id: string;
  title: string;
  description: string;
  rating: number;
  photos: ReviewPhoto[];
  updatedAt: string;
  placeType: string;
  creator: Creator;
}

export interface UserReview extends Omit<Review, 'creator'> {
  placeId: PlaceProps;
}

export interface UserReviewResponse {
  creator: Creator;
  reviews: UserReview[];
}
