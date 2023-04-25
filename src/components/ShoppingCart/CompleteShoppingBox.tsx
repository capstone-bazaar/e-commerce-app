import styled from 'styled-components';
import { Button } from '../Buttons/Button';
import { STEPS } from '../../utils/constants';

type Props = {
  changeStep: React.Dispatch<React.SetStateAction<STEPS>>;
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
}: Props) {
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
            ? shoppingCartItems.reduce((acc: any, cur) => acc + cur.price, 0)
            : 0}
        </TotalPrice>
      </div>
      <Button onClick={hanldeNextStep} style={{ width: '100%' }}>
        Continue to payment
      </Button>
    </Box>
  );
}
