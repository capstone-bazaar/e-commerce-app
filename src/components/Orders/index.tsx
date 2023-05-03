import styled from 'styled-components';
import OrderItem from './OrderItem';

interface ProductInterface {
  title: string;
  imageURLs: string[];
  description: string;
}
export interface OrderInterface {
  shippingAddress: string;
  price: number;
  status: number;
  orderNumber: number;
  paymentMethod: string;
  createdAt: number;
  product: ProductInterface;
}

const PageTitleContainer = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 20px;
`;

export default function Orders({ data }: { data: any }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PageTitleContainer>My Orders</PageTitleContainer>

      {data.me?.orders?.map((order: OrderInterface, index: number) => {
        return <OrderItem key={index} orderData={order} />;
      })}
    </div>
  );
}
