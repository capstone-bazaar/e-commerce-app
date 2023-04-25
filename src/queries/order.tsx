import { gql } from '@apollo/client';

export const GIVE_ORDER = gql`
  mutation GiveOrder {
    giveOrder
  }
`;
