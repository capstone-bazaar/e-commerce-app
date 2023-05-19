import { gql } from '@apollo/client';

export const GIVE_ORDER = gql`
  mutation GiveOrder($shippingAddress: String, $paymentMethod: String) {
    giveOrder(shippingAddress: $shippingAddress, paymentMethod: $paymentMethod)
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderID: ID, $status: String, $trackingNumber: String) {
    updateOrder(
      orderID: $orderID
      status: $status
      trackingNumber: $trackingNumber
    ) {
      id
    }
  }
`;
