import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
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
import ActiveOrderTab from '../components/UserProfile/tabs/activeOrderTab';
import TotalProductTab from '../components/UserProfile/tabs/totalProductsTab';
import { GET_ME } from '../queries/user';

enum TABS {
  TOTAL_PRODUCT_TAB,
  ACTIVE_ORDER_TAB,
}

export default function UserProfile() {
  const { loading, error, data } = useQuery(GET_ME);
  const [activeTab, setActiveTab] = useState(TABS.TOTAL_PRODUCT_TAB);

  let activeComponent;

  switch (activeTab) {
    case TABS.ACTIVE_ORDER_TAB:
      activeComponent = <ActiveOrderTab />;
      break;
    case TABS.TOTAL_PRODUCT_TAB:
      activeComponent = <TotalProductTab data={data?.me?.products} />;
      break;

    default:
      activeComponent = <TotalProductTab data={data?.me?.products} />;
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
      <ProfileContainer>
        <ProfileImgBox>
          <ImgProfile src={data.me.avatarURL} />
          <LabelBox>
            <ProfileLabel>{data.me.fullName}</ProfileLabel>
            <DescriptionLabel>{data.me.bio}</DescriptionLabel>
          </LabelBox>
        </ProfileImgBox>
        <RightBox>
          <ProductProfileBox
            onClick={() => handleButtonClick(TABS.TOTAL_PRODUCT_TAB)}
          >
            <ProductLabel>Total Product</ProductLabel>
            <ProductLabelStockCounter>
              {data?.me?.products?.length || 0}
            </ProductLabelStockCounter>
          </ProductProfileBox>
          <OrderBox onClick={() => handleButtonClick(TABS.ACTIVE_ORDER_TAB)}>
            <ActiveOrderLabel>Active Order</ActiveOrderLabel>
            <ActiveOrderStockLabel>
              {data?.me?.activeOrders?.length || 0}
            </ActiveOrderStockLabel>
          </OrderBox>
        </RightBox>
      </ProfileContainer>
      <HorizontalLine />

      {activeComponent}
    </PageWithNavbar>
  );
}
