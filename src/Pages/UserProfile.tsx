import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import GET_PRODUCTS from '../components/Cards/CardData';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActiveOrderLabel,
  ActiveOrderStockLabel,
  DescriptionLabel,
  HorizontalLine,
  ImgProfile,
  LabelBox,
  OrderBox,
  ProductLabel,
  ProductLabelStockCounter,
  ProductProfileBox,
  ProfileContainer,
  ProfileImgBox,
  ProfileLabel,
  RightBox,
} from '../components/UserProfile/Components';
import indian from '../components/UserProfile/Image/indian-senior.png';
import TotalProduct from '../components/TotalProduct/TotalProduct';
import ActiveOrderTab from '../components/UserProfile/tabs/activeOrderTab';
import TotalPrdouctTab from '../components/UserProfile/tabs/totalProductsTab';

enum TABS {
  TOTAL_PRODUCT_TAB,
  ACTIVE_ORDER_TAB,
}

export default function UserProfile() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [activeTab, setActiveTab] = useState(TABS.TOTAL_PRODUCT_TAB);

  let activeComponent;

  switch (activeTab) {
    case TABS.ACTIVE_ORDER_TAB:
      activeComponent = <ActiveOrderTab />;
      break;
    case TABS.TOTAL_PRODUCT_TAB:
      activeComponent = <TotalPrdouctTab data={data} />;
      break;

    default:
      activeComponent = <TotalPrdouctTab data={data} />;
      break;
  }
  const handleButtonClick = (tab: TABS) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <div>Error</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <PageWithNavbar>
      <title>Welcome</title>
      <ProfileContainer>
        <ProfileImgBox>
          <ImgProfile src={indian} />
          <LabelBox>
            <ProfileLabel>Jhon Doe Özdemir</ProfileLabel>
            <DescriptionLabel>Tarladan Kapınıza</DescriptionLabel>
          </LabelBox>
        </ProfileImgBox>
        <RightBox>
          <ProductProfileBox
            onClick={() => handleButtonClick(TABS.TOTAL_PRODUCT_TAB)}
          >
            <ProductLabel>Total Product</ProductLabel>
            <ProductLabelStockCounter>60</ProductLabelStockCounter>
          </ProductProfileBox>
          <OrderBox onClick={() => handleButtonClick(TABS.ACTIVE_ORDER_TAB)}>
            <ActiveOrderLabel>Active Order</ActiveOrderLabel>
            <ActiveOrderStockLabel>60</ActiveOrderStockLabel>
          </OrderBox>
        </RightBox>
      </ProfileContainer>
      <HorizontalLine />

      {activeComponent}
    </PageWithNavbar>
  );
}
