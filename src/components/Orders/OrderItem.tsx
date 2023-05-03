import styled from 'styled-components';
import TextArea from '../Input/TextArea';
import { Button } from '../Buttons/Button';

import {
  SHIPMENT_STATES,
  SHIPMENT_STATUSES,
  rateOptions,
} from '../../utils/constants';
import SelectField from '../Input/SelectField';

import { OrderInterface } from '.';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../queries/comment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import RateStars from '../RateStars/RateStars';
import { GET_ME } from '../../queries/user';
dayjs.extend(utc);

interface SectionContainerInterface {
  backgroundColor?: string;
}

interface DeliverStatusIconContainerInterface {
  backgroundColor?: string;
}

interface CommentInterface {
  productID: string;
  comment: string | null;
  rate: number;
}

const Container = styled.div`
  width: 100%;
  min-height: 250px;
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

const RateSelectinAndButtonContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
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
const TrackingNumber = styled.div`
  font-size: 14px;
  font-weight: 200;
`;
const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  color: #484848;
`;

const DeliverStatusIconContainer = styled.div<DeliverStatusIconContainerInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.backgroundColor || 'white'};
`;

const DeliverStatus = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export default function OrderItem({
  orderData,
  myId,
}: {
  orderData: OrderInterface;
  myId: string;
}) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [commentState, setCommentState] = useState<CommentInterface>({
    productID: orderData.product.id,
    comment: '',
    rate: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentState({
      ...commentState,
      [name]: value,
    });
  };

  const getOldComment = () => {
    const comments = orderData.product.comments || [];
    const oldComment = comments.find((comment) => comment.user.id === myId);
    return oldComment;
  };

  // eslint-disable-next-line
  const handleSelectFieldChange = (e: any) => {
    const { value } = e;

    setCommentState({
      ...commentState,
      rate: value,
    });
  };
  const handleSubmitComment = async () => {
    try {
      await addComment({
        refetchQueries: [GET_ME],
        variables: {
          fields: {
            productID: commentState.productID,
            comment: commentState.comment,
            rate: commentState.rate,
          },
        },
      });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Container>
      <SectionContainer>
        <SectionTitle>
          Ordered Product (
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
      <SectionContainer
        backgroundColor={SHIPMENT_STATUSES[orderData.status].secondaryColor}
      >
        <SectionTitle>Informations</SectionTitle>
        <InfoSection>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <DeliverStatusIconContainer
              backgroundColor={SHIPMENT_STATUSES[orderData.status].primaryColor}
            >
              {SHIPMENT_STATUSES[orderData.status].icon}
            </DeliverStatusIconContainer>
            <div style={{ marginLeft: '10px' }}>
              <DeliverStatus>
                {SHIPMENT_STATUSES[orderData.status].description}
              </DeliverStatus>
              {orderData.trackingNumber && (
                <TrackingNumber>
                  Tracking number: {orderData.trackingNumber}
                </TrackingNumber>
              )}
            </div>
          </div>
        </InfoSection>{' '}
        <InfoSection>
          <div style={{ width: '100%', marginTop: '10px', fontSize: '14px' }}>
            <b>Order No: </b> {orderData.orderNumber}
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
        <SectionTitle>Comment</SectionTitle>
        {!getOldComment() ? (
          <>
            {' '}
            <TextArea
              name="comment"
              width="100%"
              height="40%"
              placeholder="Enter your comment"
              onChange={(e) => handleChange(e)}
            />
            <RateSelectinAndButtonContainer>
              <SelectField
                onChange={(e) => handleSelectFieldChange(e)}
                defaultValue={rateOptions[4]}
                name="color"
                options={rateOptions}
              />
              <Button
                style={{ width: '50%', height: '54px' }}
                onClick={handleSubmitComment}
                disabled={orderData.status !== SHIPMENT_STATES.DELIVERED}
              >
                Submit
              </Button>
            </RateSelectinAndButtonContainer>{' '}
          </>
        ) : (
          <>
            <RateStars rate={getOldComment()?.rate} />
            {getOldComment()?.comment}
          </>
        )}
      </SectionContainer>
    </Container>
  );
}
