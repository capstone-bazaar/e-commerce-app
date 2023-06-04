import styled from 'styled-components';

import { Button } from '../Buttons/Button';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { OrderInterface } from '../Orders/index';

import { SHIPMENT_STATES, SHIPMENT_STATUSES } from '../../utils/constants';
import { Tag } from 'antd';
import { Input } from '../Input/Input';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER } from '../../queries/order';
import { GET_ME } from '../../queries/user';
dayjs.extend(utc);

interface SectionContainerInterface {
  backgroundColor?: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  border: 1px solid #ccc;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionContainer = styled.div<SectionContainerInterface>`
  flex: 1;
  width: inherit;
  padding: 20px;
  background-color: ${(props) => props.backgroundColor || 'white'};
`;

const SectionTitle = styled.div`
  color: #484848;
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const ProductContainer = styled.div`
  gap: 10px;
  display: flex;
`;

const ProductImage = styled.img`
  height: 80px;
  width: 70px;
  border: 1px solid #ccc;
`;

const ProductTitle = styled.div`
  color: #484848;
  font-size: 14px;
  font-weight: 600;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  color: #484848;
`;

export default function UnshippedOrderItem({
  orderData,
}: {
  orderData: OrderInterface;
}) {
  const [updateOrder, { loading }] = useMutation(UPDATE_ORDER);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrackingNumber(e.target.value);
  };

  const handleSubmit = async () => {
    if (trackingNumber !== '') {
      await updateOrder({
        refetchQueries: [GET_ME],
        variables: {
          orderID: orderData.id,
          trackingNumber,
          status: SHIPMENT_STATES.IN_TRANSIT,
        },
      });
    }
  };
  return (
    <Container>
      <SectionContainer>
        <SectionTitle>
          Unshipped Product (
          {dayjs.utc(Number(orderData.createdAt)).format('DD/MM/YYYY')})
        </SectionTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '80%',
          }}
        >
          <ProductContainer>
            <ProductImage src={orderData.product.imageURLs[0]} />
            <ProductTitle>{orderData?.product?.title}</ProductTitle>
          </ProductContainer>
          <div style={{ fontSize: '30px' }}>{orderData?.price}$</div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Informations</SectionTitle>
        <InfoSection>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div>
              <b>Status: </b>
              <Tag color={SHIPMENT_STATUSES[orderData.status].primaryColor}>
                {SHIPMENT_STATUSES[orderData.status].description}
              </Tag>
            </div>
          </div>
        </InfoSection>{' '}
        <InfoSection>
          <div style={{ width: '100%', marginTop: '10px', fontSize: '14px' }}>
            <b>Order No: </b> {orderData.orderNumber}
          </div>
        </InfoSection>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Customer Options</SectionTitle>

        <InfoSection>
          <div style={{ width: '100%', marginTop: '10px', fontSize: '14px' }}>
            <b>Buyer: </b> {orderData?.buyer?.fullName}
          </div>
        </InfoSection>
        <InfoSection>
          <div style={{ width: '100%', marginTop: '10px', fontSize: '14px' }}>
            <b>Phone: </b> {orderData?.buyer?.phone}
          </div>
        </InfoSection>
        <InfoSection>
          <div style={{ width: '100%', marginTop: '10px', fontSize: '14px' }}>
            <b>Address</b>
            <div>{orderData.shippingAddress}</div>
          </div>
        </InfoSection>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Tracking</SectionTitle>

        {orderData.status !== SHIPMENT_STATES.PREPARING && (
          <>
            <b>Tracking Number: </b>{' '}
            {orderData.trackingNumber || 'Not Specified'}
          </>
        )}

        {orderData.status === SHIPMENT_STATES.PREPARING && (
          <>
            <Input
              onChange={(e) => {
                handleTrackingNumberChange(e);
              }}
              placeholder="Enter the tracking number"
              style={{ width: '100%' }}
            />
            <Button
              onClick={handleSubmit}
              style={{ marginTop: '20px', width: '100%' }}
              disabled={
                orderData.status !== SHIPMENT_STATES.PREPARING || loading
              }
            >
              Add
            </Button>
          </>
        )}
      </SectionContainer>
    </Container>
  );
}
