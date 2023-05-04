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

export const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    findAllProducts {
      id
      price
      currency
      stockCount
      seller {
        avatarURL
        fullName
      }
      imageURLs
      comments {
        user {
          fullName
        }
        comment
        rate
      }
      createdAt
      updatedAt
    }
  }
`;

