import styled from 'styled-components';
import { PAYMENT_METHODS } from '../../../utils/constants';
import CreditCardField from '../../CreditCardField/CreditCardField';

const SectionTitle = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

const PaymentMethodLabel = styled.label`
  font-size: 18px;
  font-weight: 400;
  margin-left: 10px;
`;

const AddressContainer = styled.label`
  display: block;
  height: 200px;
  width: 300px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  @media (max-width: 768px) {
    width: 100%;
  }

  input[type='radio']:checked + & {
    border: 2px solid #ea004b;
  }
`;

const AddressRadioInput = styled.input`
  &[type='radio'] {
    display: none;
  }
`;

const AddressTitle = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 10px;
`;

const FormField = styled.form``;

const AddressBoxContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PaymentMethodRadioInput = styled.input`
  &[type='radio'] {
    accent-color: #ea004b;
  }
`;

export default function CheckoutStep({
  data,
  orderInfo,
  setOrderInfo,
}: {
  // eslint-disable-next-line
  data: any;
  // eslint-disable-next-line
  orderInfo: any;
  // eslint-disable-next-line
  setOrderInfo: any;
}) {
  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    setOrderInfo({
      ...orderInfo,
      [fieldName]: e.target.value,
    });
  };

  return (
    <div>
      <SectionTitle>Select your address</SectionTitle>
      <FormField style={{ marginBottom: '20px' }}>
        <AddressBoxContainer>
          {data.me.addresses.map(
            (
              address: { id: string; title: string; address: string },
              index: number
            ) => (
              <>
                <AddressRadioInput
                  name="shippingAddress"
                  type="radio"
                  id={index.toString()}
                  value={address.address}
                  onChange={(e) => handleRadioButtonChange(e)}
                />
                <AddressContainer htmlFor={index.toString()}>
                  {address.title && (
                    <AddressTitle>{address.title}</AddressTitle>
                  )}
                  {address.address}
                </AddressContainer>
              </>
            )
          )}
        </AddressBoxContainer>
        <SectionTitle>Payment Method</SectionTitle>
        <div>
          <PaymentMethodRadioInput
            type="radio"
            value={PAYMENT_METHODS.MB_MONEY}
            name="paymentMethod"
            onChange={(e) => handleRadioButtonChange(e)}
          />
          <PaymentMethodLabel htmlFor="paymentMethod">
            Pay with MB Money (<span style={{ color: '#ea004b' }}>50$</span>)
          </PaymentMethodLabel>
        </div>
        <div>
          <PaymentMethodRadioInput
            type="radio"
            value={PAYMENT_METHODS.CREDIT_CARD}
            name="paymentMethod"
            onChange={(e) => handleRadioButtonChange(e)}
          />
          <PaymentMethodLabel htmlFor="paymentMethod">
            Pay with credit card
          </PaymentMethodLabel>
        </div>
      </FormField>
      {orderInfo.paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
        <CreditCardField />
      )}
    </div>
  );
}
