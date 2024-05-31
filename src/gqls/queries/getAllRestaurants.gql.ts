import { gql } from '@/__generated__/gql';

// get restaurants from graphql
export const GRAPHQL_RESTAURANT_QUERY = gql(`
  query getAllRestaurants($input: GetRestaurantListInput!){
    getAllRestaurants(input: $input) {
        data{
            _id
            description
            name
            overAllRating
            photos {
                _id
                imageUrl
            }
        }
        
    }
  }
`);
