import styled from 'styled-components';
import { Button } from '../Buttons/Button';
import { STEPS } from '../../utils/constants';
import { useMutation } from '@apollo/client';
import { GIVE_ORDER } from '../../queries/order';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GET_ME } from '../../queries/user';

type Props = {
  changeStep: React.Dispatch<React.SetStateAction<STEPS>>;
  step: STEPS;
  orderInfo: { shippingAddress: string; paymentMethod: string };
  shoppingCartItems: {
    price: number;
  }[];
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 220px;
  background: white;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
`;

const Title = styled.div`
  color: #ea004b;
  font-size: 18px;
  font-weight: 600;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-weight: 600;
  font-size: 30px;
`;

export default function CompleteShoppingBox({
  changeStep,
  shoppingCartItems,
  step,
  orderInfo,
}: Props) {
  const [giveOrder] = useMutation(GIVE_ORDER);
  const navigate = useNavigate();

  const handleGiveOrder = async () => {
    try {
      await giveOrder({
        refetchQueries: [GET_ME],
        variables: {
          shippingAddress: orderInfo.shippingAddress,
          paymentMethod: orderInfo.paymentMethod,
        },
      });

      navigate('/orders?payment_success=true');
    } catch (error) {
      toast.error('Something went wrong, please try again', {
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

  const hanldeNextStep = () => {
    changeStep(STEPS.CHECKOUT_STEP);
  };

  return (
    <Box>
      <div>
        <Title>Selected Products ({shoppingCartItems.length})</Title>
        <TotalPrice>
          <div>Total:</div>$
          {shoppingCartItems.length > 0
            ? // eslint-disable-next-line
              shoppingCartItems.reduce((acc: any, cur) => acc + cur.price, 0)
            : 0}
        </TotalPrice>
      </div>
      {step === STEPS.CART_STEP && (
        <Button
          onClick={hanldeNextStep}
          style={{ width: '100%' }}
          disabled={shoppingCartItems.length === 0}
        >
          Continue to payment
        </Button>
      )}
      {step === STEPS.CHECKOUT_STEP && (
        <Button
          style={{ width: '100%' }}
          disabled={!orderInfo.shippingAddress || !orderInfo.paymentMethod}
          onClick={handleGiveOrder}
        >
          Place Order
        </Button>
      )}
    </Box>
  );
}
