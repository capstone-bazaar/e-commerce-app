import { gql } from '@apollo/client';

export const GIVE_ORDER = gql`
  mutation GiveOrder($shippingAddress: String, $paymentMethod: String) {
    giveOrder(shippingAddress: $shippingAddress, paymentMethod: $paymentMethod)
  }
`;
