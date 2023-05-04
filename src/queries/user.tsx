import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;
export const REGISTER = gql`
  mutation Register(
    $fullName: String
    $password: String
    $phone: String
    $email: String
    $avatarURL: String
  ) {
    register(
      fullName: $fullName
      password: $password
      phone: $phone
      email: $email
      avatarURL: $avatarURL
    )
  }
`;

export const ADD_TO_CART = gql`
  mutation AddProductToShoppingCart($productId: String) {
    addProductToShoppingCart(productId: $productId)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveProductFromShoppingCart($productId: String) {
    removeProductFromShoppingCart(productId: $productId)
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      fullName
      phone
      avatarURL
      email
      orders {
        status
        price
        trackingNumber
        orderNumber
        shippingAddress
        product {
          id
          title
          imageURLs
          comments {
            user {
              id
            }
            rate
            comment
          }
        }
        createdAt
      }
      addresses {
        id
        title
        address
      }
      shoppingCart {
        id
        price
        title
        seller {
          fullName
        }
        imageURLs
      }
      products {
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
  }
`;
