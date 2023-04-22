import styled from 'styled-components';
import { TrashIcon } from '../../../assests/icons';

const ProductContainer = styled.div`
  padding: 30px;
  width: 100%;
`;

const ImageContainer = styled.img`
  height: 100%;
  width: 125px;
  border-radius: 8px;
  border: 1px solid black;
`;

const ProductDescriptionsContainer = styled.div`
  display: flex;
`;

const SellerContainer = styled.div`
  border-bottom: 1px solid #c5c5c5;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const ProductName = styled.div`
  font-size: 20px;
`;

const ProductPrice = styled.div`
  width: auto;
  text-align: end;
  font-size: 25px;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
`;

const Wrapper = styled.div`
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  width: 97%;
  padding-left: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function CartStep() {
  return (
    <Wrapper>
      <div>
        <TrashIcon />
      </div>
      <ProductContainer>
        <SellerContainer>
          Seller: <b></b>
        </SellerContainer>
        <ProductDescriptionsContainer>
          <ImageContainer src="" />
          <ProductInfoContainer>
            <ProductName></ProductName>
            <ProductPrice></ProductPrice>
          </ProductInfoContainer>
        </ProductDescriptionsContainer>
      </ProductContainer>
    </Wrapper>
  );
}
