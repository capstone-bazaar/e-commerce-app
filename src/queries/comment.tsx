import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($fields: AddCommentInput) {
    addComment(fields: $fields) {
      id
    }
  }
`;
