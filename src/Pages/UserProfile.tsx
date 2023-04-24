import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import GET_PRODUCTS from '../components/Cards/CardData';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [buttonlink, setButton] = useState(false);
  const [buttonslink, setButtons] = useState(false);
  const navigates = useNavigate();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <div>Error</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  const handleButtonClick = () => {
    setButton(true);
  };
  const handleButtonsClick = () => {
    setButtons(true);
  };

  if (buttonlink) {
    navigate('/total-product');
  }
  if (buttonslink) {
    navigates('/active-product');
  }
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
          <ProductProfileBox onClick={handleButtonClick}>
            <label>Total Product</label>
            <label>60</label>
          </ProductProfileBox>
          <OrderBox onClick={handleButtonsClick}>
            <label>Active Order</label>
            <label>60</label>
          </OrderBox>
        </RightBox>
      </ProfileContainer>
      <HorizontalLine />

      <CardBox style={{ marginTop: '10px' }}>
        {data.findAllProducts.map(
          (
            product: {
              price: string;
              imageURL: string;
              productName: string;
              description: string;
              sellerImage: string;
              sellerName: string;
              points: string;
              currency: string;
            },
            index: number
          ) => {
            return (
              <Card
                price={product.price}
                image={product.imageURL}
                productName={product.productName}
                description={product.description}
                sellerImage={product.sellerImage}
                sellerName={product.sellerName}
                points={product.points}
                currency={product.currency}
              />
            );
          }
        )}
      </CardBox>
    </PageWithNavbar>
  );
}
