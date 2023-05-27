import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user
    }
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
    ) {
      token
      user
    }
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

export const GET_USER = gql`
  query GetUser($id: String) {
    getUser(id: $id) {
      id
      fullName
      avatarURL
      products {
        id
        price
        currency
        stockCount
        title
        avgRate
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

export const UPDATE_USER = gql`
  mutation UpdateUser($fields: UserInput) {
    updateUser(fields: $fields) {
      id
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      fullName
      phone
      avatarURL
      budget
      email
      unshippedOrders {
        id
        status
        price
        buyer {
          fullName
          phone
        }
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
          id
          fullName
        }
        imageURLs
      }
      products {
        id
        price
        currency
        stockCount
        title
        description
        avgRate
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

export const UPLOAD_MONEY = gql`
  mutation UploadMoney($amount: Int) {
    uploadMoney(amount: $amount)
  }
`;
