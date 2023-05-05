import { gql } from '@apollo/client';

const GET_TOTAL_PRODUCT = gql`
  query GetTotalProduct {
    allProducts {
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
export default GET_TOTAL_PRODUCT;
