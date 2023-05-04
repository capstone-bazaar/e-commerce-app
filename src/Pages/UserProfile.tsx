import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  ActiveOrderStockLabel,
  DescriptionLabel,
  HorizontalLine,
  ImgProfile,
  LabelBox,
  ProductLabelStockCounter,
  ProfileContainer,
  ProfileImgBox,
  ProfileLabel,
  RightBox,
  TabBox,
  TabContainer,
} from '../components/UserProfile/Components';
import ActiveOrderTab from '../components/UserProfile/tabs/activeOrderTab';
import TotalProductTab from '../components/UserProfile/tabs/totalProductsTab';
import { GET_ME } from '../queries/user';
import { ContainerBox } from '../components/container';
import styled from 'styled-components';

enum TABS {
  TOTAL_PRODUCT_TAB,
  ACTIVE_ORDER_TAB,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
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
      <ContainerBox>
        <Container>
          <ProfileContainer>
            <ProfileImgBox>
              <ImgProfile src={data.me.avatarURL} />
              <LabelBox>
                <ProfileLabel>{data.me.fullName}</ProfileLabel>
                <DescriptionLabel>{data.me.bio}</DescriptionLabel>
              </LabelBox>
            </ProfileImgBox>
            <RightBox>
              <TabBox
                isActive={activeTab === TABS.TOTAL_PRODUCT_TAB}
                onClick={() => handleButtonClick(TABS.TOTAL_PRODUCT_TAB)}
              >
                <TabContainer>Total Product</TabContainer>
                <ProductLabelStockCounter>
                  {data?.me?.products?.length || 0}
                </ProductLabelStockCounter>
              </TabBox>
              <TabBox
                isActive={activeTab === TABS.ACTIVE_ORDER_TAB}
                onClick={() => handleButtonClick(TABS.ACTIVE_ORDER_TAB)}
              >
                <TabContainer>Active Order</TabContainer>
                <ActiveOrderStockLabel>
                  {data?.me?.activeOrders?.length || 0}
                </ActiveOrderStockLabel>
              </TabBox>
            </RightBox>
          </ProfileContainer>
          <HorizontalLine />

          {activeComponent}
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
