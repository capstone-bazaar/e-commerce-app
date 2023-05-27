import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
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
import { GET_ME, GET_USER } from '../queries/user';
import { ContainerBox } from '../components/container';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

enum TABS {
  TOTAL_PRODUCT_TAB,
  ACTIVE_ORDER_TAB,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
export default function UserProfile() {
  const { id } = useParams();

  const [getMe, { loading: meLoading, error: meError, data: meData }] =
    useLazyQuery(GET_ME);
  const [
    getUser,
    { loading: otherUserLoading, error: otherUserError, data: otherUserData },
  ] = useLazyQuery(GET_USER);

  const [data, setData] = useState<any>();
  const [isOtherUser, setIsOtherUser] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.TOTAL_PRODUCT_TAB);

  useEffect(() => {
    if (id) {
      getUser({ variables: { id } });
      setIsOtherUser(true);
    }
    getMe();
  }, []);

  useEffect(() => {
    if (otherUserData) {
      return setData(otherUserData?.getUser);
    }
    setData(meData?.me);
  }, [meData, otherUserData]);

  if (otherUserLoading || meLoading || !data) {
    return <div>Error</div>;
  }
  if (otherUserError || meError) {
    return <div>Error</div>;
  }

  let activeComponent;

  switch (activeTab) {
    case TABS.ACTIVE_ORDER_TAB:
      activeComponent = <ActiveOrderTab data={data?.unshippedOrders} />;
      break;
    case TABS.TOTAL_PRODUCT_TAB:
      activeComponent = (
        <TotalProductTab data={data?.products} isOtherUser={isOtherUser} />
      );
      break;

    default:
      activeComponent = (
        <TotalProductTab data={data?.products} isOtherUser={isOtherUser} />
      );
      break;
  }
  const handleButtonClick = (tab: TABS) => {
    setActiveTab(tab);
  };

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          <ProfileContainer>
            <ProfileImgBox>
              <ImgProfile src={data.avatarURL} />
              <LabelBox>
                <ProfileLabel>{data.fullName}</ProfileLabel>
                <DescriptionLabel>{data.bio}</DescriptionLabel>
              </LabelBox>
            </ProfileImgBox>
            <RightBox>
              <TabBox
                isActive={activeTab === TABS.TOTAL_PRODUCT_TAB}
                onClick={() => handleButtonClick(TABS.TOTAL_PRODUCT_TAB)}
              >
                <TabContainer>Total Product</TabContainer>
                <ProductLabelStockCounter>
                  {data?.products?.length || 0}
                </ProductLabelStockCounter>
              </TabBox>
              {!isOtherUser && (
                <TabBox
                  isActive={activeTab === TABS.ACTIVE_ORDER_TAB}
                  onClick={() => handleButtonClick(TABS.ACTIVE_ORDER_TAB)}
                >
                  <TabContainer>Active Order</TabContainer>
                  <ActiveOrderStockLabel>
                    {data?.unshippedOrders?.length || 0}
                  </ActiveOrderStockLabel>
                </TabBox>
              )}
            </RightBox>
          </ProfileContainer>
          <HorizontalLine />

          {activeComponent}
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
