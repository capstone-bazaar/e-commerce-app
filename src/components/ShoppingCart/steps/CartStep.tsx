import styled from 'styled-components';
import { TrashIcon } from '../../../assests/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

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

export default function CartStep({
  onRemoveProduct,
  data,
}: {
  onRemoveProduct: (productId: string) => void;
  // eslint-disable-next-line
  data: any;
}) {
  const navigate = useNavigate();

  const { userID } = useAuth();

  // eslint-disable-next-line
  return data.me.shoppingCart.map((item: any, index: number) => (
    <Wrapper key={index}>
      <div onClick={() => onRemoveProduct(item.id)}>
        <TrashIcon />
      </div>
      <ProductContainer>
        <SellerContainer
          onClick={() =>
            navigate(
              userID !== item.seller.id
                ? `/profile/${item.seller.id}`
                : `/profile`
            )
          }
        >
          Seller: <b>{item.seller.fullName}</b>
        </SellerContainer>
        <ProductDescriptionsContainer>
          <ImageContainer src={item.imageURLs[0]} />
          <ProductInfoContainer>
            <ProductName>{item.title}</ProductName>
            <ProductPrice>${item.price}</ProductPrice>
          </ProductInfoContainer>
        </ProductDescriptionsContainer>
      </ProductContainer>
    </Wrapper>
  ));
}
