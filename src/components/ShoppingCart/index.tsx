import { useState } from 'react';
import CartStep from './steps/CartStep';
import CheckoutStep from './steps/CheckoutStep';
import { STEPS } from '../../utils/constants';
import styled from 'styled-components';
import CompleteShoppingBox from './CompleteShoppingBox';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME, REMOVE_FROM_CART } from '../../queries/user';
import { ToastContainer, toast } from 'react-toastify';

interface OrderInterface {
  paymentMethod: string;
  shippingAddress: string;
}

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
  const [orderInfo, setOrderInfo] = useState<OrderInterface>({
    paymentMethod: '',
    shippingAddress: '',
  });

  const [removeProduct] = useMutation(REMOVE_FROM_CART);
  const { data, loading, error } = useQuery(GET_ME);

  const handleRemoveItemFromCart = async (productId: string) => {
    try {
      await removeProduct({
        variables: {
          productId,
        },
        refetchQueries: [GET_ME],
      });
      toast.success('Product removed from your cart', {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      toast.error('Something went wrong.', {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  let Component: JSX.Element | null = null;

  switch (currentStep) {
    case STEPS.CART_STEP:
      Component = (
        <CartStep data={data} onRemoveProduct={handleRemoveItemFromCart} />
      );
      break;

    case STEPS.CHECKOUT_STEP:
      Component = (
        <CheckoutStep
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          data={data}
        />
      );
      break;

    default:
      break;
  }

  return (
    <BoxContainer>
      <ToastContainer />
      <ContentContainer>{Component}</ContentContainer>
      <CompleteShoppingBoxContainer>
        <CompleteShoppingBox
          step={currentStep}
          changeStep={setCurrentStep}
          shoppingCartItems={data.me.shoppingCart}
          orderInfo={orderInfo}
        />
      </CompleteShoppingBoxContainer>
    </BoxContainer>
  );
}
