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
      title
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

export const ADD_PRODUCT = gql`
  mutation AddProduct($fields: ProductInput) {
    addProduct(fields: $fields) {
      id
    }
  }
`;
