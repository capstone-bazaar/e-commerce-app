import { gql } from '@apollo/client';
const GET_PRODUCTS = gql`
  query GetProducts {
    findAllProducts {
      id
      price
      currency
      stockCount
      seller {
        avatarURL {
          avatarUrl
        }
        fullName
      }
      imageURL
      comments {
        userId
        comment
        rate
      }
      createdAt
      updatedAt
    }
  }
`;

export default GET_PRODUCTS;
