import React from 'react';
import {
  BoxOne,
  CardContainer,
  CardLabel,
  IconBox,
  ImgContainer,
  InsideContainer,
  InsideContainerTwo,
  PointLabel,
  ProductPrice,
  SellerName,
  TitleText,
  VerticalLine,
} from './CardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function Card({
  price,
  image,
  productName,
  description,
  sellerImage,
  sellerName,
  points,
  currency,
}: {
  price: string;
  image: string;
  productName: string;
  description: string;
  sellerImage: string;
  sellerName: string;
  points: string;
  currency: string;
}) {
  return (
    <CardContainer>
      <ImgContainer>
        <img
          alt="s"
          src={image}
          style={{
            width: '100%',
            height: '110px',
            borderRadius: '20px 20px 1px 1px',
          }}
        />
        <ProductPrice>
          {price} {currency}
        </ProductPrice>
      </ImgContainer>
      <InsideContainer>
        <TitleText>{productName}</TitleText>
        <CardLabel>{description}</CardLabel>
      </InsideContainer>
      <InsideContainerTwo>
        <BoxOne>
          <img
            alt="s"
            src={sellerImage}
            style={{ width: '31px', borderRadius: '50%' }}
          />
          <SellerName>{sellerName}</SellerName>
        </BoxOne>
        <VerticalLine />
        <IconBox>
          <PointLabel>
            {points}/5 <FontAwesomeIcon icon={faStar} />
          </PointLabel>
        </IconBox>
      </InsideContainerTwo>
    </CardContainer>
  );
}
