import { gql } from '@apollo/client';

const GET_ACTIVE_PRODUCT = gql`
  query GetActiveProduct {
    findProductById(id: String) {
      id
      price
      currency
      description
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
export default GET_ACTIVE_PRODUCT;
