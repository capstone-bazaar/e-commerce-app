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
        id
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
  query GetProduct($filters: FilterInput) {
    findAllProducts(filters: $filters) {
      id
      price
      title
      currency
      stockCount
      seller {
        id
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

export const GET_USER_ADDED_PRODUCTS = gql`
  query GetUserAddedProduct {
    me {
      products {
        id
        price
        currency
        stockCount
        title
        description
        seller {
          id
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
  }
`;
