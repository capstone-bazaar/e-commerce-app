import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetProduct($productID: String) {
    findProductById(productID: $productID) {
      id
      price
      title
      description
      currency
      stockCount
      seller {
        fullName
        avatarURL
      }
      imageURLs
      comments {
        id
        user {
          fullName
          avatarURL
        }
        comment
        rate
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
