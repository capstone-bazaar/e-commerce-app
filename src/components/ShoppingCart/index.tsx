import { useState } from 'react';
import CartStep from './steps/CartStep';
import CheckoutStep from './steps/CheckoutStep';
import { STEPS } from '../../utils/constants';
import styled from 'styled-components';
import CompleteShoppingBox from './CompleteShoppingBox';

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompleteShoppingBoxContainer = styled.div`
  width: 20%;
  height: 100%;
  position: sticky;
  top: 0;
  @media (max-width: 768px) {
    bottom: 0;
    width: 100%;
  }
`;

export default function ShoppingCartComponent() {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.CART_STEP);

  let Component: JSX.Element | null = null;

  switch (currentStep) {
    case STEPS.CART_STEP:
      Component = <CartStep />;
      break;

    case STEPS.CHECKOUT_STEP:
      Component = <CheckoutStep />;
      break;

    default:
      break;
  }

  return (
    <BoxContainer>
      <ContentContainer>{Component}</ContentContainer>
      <CompleteShoppingBoxContainer>
        <CompleteShoppingBox changeStep={setCurrentStep} />
      </CompleteShoppingBoxContainer>
    </BoxContainer>
  );
}
