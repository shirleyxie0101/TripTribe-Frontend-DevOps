import { gql } from '@/__generated__/gql';

// get attractions from graphql
export const GRAPHQL_ATTRACTION_QUERY = gql(`
    query getAllAttractions($input: GetAttractionListInput!){
        getAllAttractions(input: $input) {
            data {
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
