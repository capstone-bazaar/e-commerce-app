import styled from 'styled-components';
import OrderItem from './OrderItem';
import { SHIPMENT_ENUM } from '../../utils/constants';

interface CommentInterface {
  user: {
    id: string;
  };
  rate: number;
  comment: string;
}
interface ProductInterface {
  id: string;
  title: string;
  imageURLs: string[];
  description: string;
  comments: CommentInterface[];
}

interface BuyerInterface {
  fullName: string;
  phone: string;
}

export interface OrderInterface {
  id: string;
  shippingAddress: string;
  price: number;
  status: SHIPMENT_ENUM;
  orderNumber: number;
  paymentMethod: string;
  createdAt: number;
  product: ProductInterface;
  trackingNumber: string;
  buyer: BuyerInterface;
}

const PageTitleContainer = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 20px;
`;
// eslint-disable-next-line
export default function Orders({ data }: { data: any }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PageTitleContainer>My Orders</PageTitleContainer>

      {data.me?.orders
        ?.map((order: OrderInterface, index: number) => {
          return (
            <OrderItem key={index} orderData={order} myId={data?.me?.id} />
          );
        })
        ?.reverse()}
    </div>
  );
}
