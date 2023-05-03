import styled from 'styled-components';
import { MasterCardIcon } from '../../assests/icons';
import { Input } from '../Input/Input';

const CreditCardLabel = styled.label`
  display: block;
  margin-top: 20px;
`;

const CreditCardBoxContainer = styled.div`
  width: 60%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 50px;
  border-radius: 5px;
  margin-top: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function CreditCardField() {
  return (
    <CreditCardBoxContainer>
      <h2>Payment Details</h2>
      <CreditCardLabel>Name</CreditCardLabel>
      <Input style={{ width: '100%' }}></Input>
      <div style={{ position: 'relative' }}>
        <CreditCardLabel>Credit Card Number</CreditCardLabel>
        <Input
          type="number"
          style={{ width: '100%', paddingRight: '35px' }}
        ></Input>
        <div style={{ position: 'absolute', right: 6, top: 20 }}>
          <MasterCardIcon />
        </div>
      </div>

      <div
        style={{
          display: 'inline-block',
          width: '50%',
          paddingRight: '10px',
        }}
      >
        <CreditCardLabel>Expriation Date</CreditCardLabel>
        <Input style={{ width: '100%' }} />
      </div>
      <div style={{ display: 'inline-block', width: '50%' }}>
        <CreditCardLabel>CVV</CreditCardLabel>
        <Input style={{ width: '100%' }} />
      </div>
    </CreditCardBoxContainer>
  );
}
