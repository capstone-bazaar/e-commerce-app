import React from 'react';
import {
  BoxOne,
  CardContainer,
  CardLabel,
  ImgContainer,
  InsideContainer,
  InsideContainer2,
  PointLabel,
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
  consumerImage,
  consumerName,
  points,
}: {
  price: string;
  image: string;
  productName: string;
  description: string;
  consumerImage: string;
  consumerName: string;
  points: string;
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
        ></img>
        <label
          style={{
            boxSizing: 'border-box',
            border: '3px solid #000000',
            borderRadius: '20px',
            width: '75px',
            position: 'absolute',
            bottom: '0',
            right: '0',
            background: '#FFFFFF',
            textAlign: 'center',
            fontWeight: '800',
          }}
        >
          {price}
        </label>
      </ImgContainer>
      <InsideContainer>
        <TitleText>{productName}</TitleText>
        <CardLabel>{description}</CardLabel>
      </InsideContainer>
      <InsideContainer2>
        <BoxOne>
          <img
            alt="s"
            src={consumerImage}
            style={{ width: '31px', borderRadius: '50%' }}
          ></img>
          <label style={{ fontSize: '10px', fontWeight: '800' }}>
            {consumerName}
          </label>
        </BoxOne>
        <VerticalLine />
        <PointLabel>
          {points}/5{' '}
          <FontAwesomeIcon icon={faStar} style={{ paddingTop: '10px' }} />
        </PointLabel>
      </InsideContainer2>
    </CardContainer>
  );
}
