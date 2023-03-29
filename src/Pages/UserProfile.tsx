import React from 'react';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import CardDatas from '../components/Cards/CardData';
import styled from 'styled-components';
import {
  DescriptionLabel,
  HorizontalLine,
  LabelBox,
  OrderBox,
  ProductProfileBox,
  ProfileContainer,
  ProfileImgBox,
  ProfileLabel,
  RightBox,
} from '../components/UserProfile/Components';
import indian from '../components/UserProfile/Image/indian-senior.png';

export default function UserProfile() {
  return (
    <PageWithNavbar>
      <title>Welcome</title>
      <ProfileContainer>
        <ProfileImgBox>
          <img src={indian} />
          <LabelBox>
            <ProfileLabel>Jhon Doe Özdemir</ProfileLabel>
            <DescriptionLabel>Tarladan Kapınıza</DescriptionLabel>
          </LabelBox>
        </ProfileImgBox>
        <RightBox>
          <ProductProfileBox>
            <label>Total Product</label>
            <label>60</label>
          </ProductProfileBox>
          <OrderBox>
            <label>Active Order</label>
            <label>60</label>
          </OrderBox>
        </RightBox>
      </ProfileContainer>
      <HorizontalLine />

      <CardBox style={{ marginTop: '10px' }}>
        {CardDatas.map((data, index) => {
          return (
            <Card
              price={data.price}
              image={data.image}
              productName={data.productName}
              description={data.description}
              sellerImage={data.sellerImage}
              sellerName={data.sellerName}
              points={data.points}
            />
          );
        })}
      </CardBox>
    </PageWithNavbar>
  );
}
