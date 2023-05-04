import {
  BoxOne,
  CardContainer,
  CardLabel,
  IconBox,
  ImgContainer,
  InsideContainer,
  InsideContainerTwo,
  PointLabel,
  ProductPrice,
  SellerName,
  TitleText,
  VerticalLine,
} from './CardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import ParagraphSlicer from '../ParagraphSlicer/ParagraphSlicer';
export default function Card({
  price,
  image,
  title,
  description,
  sellerImage,
  sellerName,
  points,
  currency,
  onClick,
}: {
  price: string;
  image: string;
  title: string;
  description: string;
  sellerImage: string;
  sellerName: string;
  points: string;
  currency: string;
  onClick?: () => void;
}) {
  return (
    <CardContainer onClick={onClick}>
      <ImgContainer>
        <img
          alt="s"
          src={image}
          style={{
            width: '100%',
            height: '120px',
            borderRadius: '20px 20px 1px 1px',
          }}
        />
        <ProductPrice>
          {price} {currency}
        </ProductPrice>
      </ImgContainer>
      <InsideContainer>
        <TitleText>{title}</TitleText>
        <CardLabel>
          <ParagraphSlicer paragraph={description} slice={50} />
        </CardLabel>
      </InsideContainer>
      <InsideContainerTwo>
        <BoxOne>
          <img
            alt="s"
            src={sellerImage}
            style={{ width: '31px', borderRadius: '50%' }}
          />
          <SellerName>{sellerName}</SellerName>
        </BoxOne>
        <VerticalLine />
        <IconBox>
          <PointLabel>
            {points}/5 <FontAwesomeIcon icon={faStar} />
          </PointLabel>
        </IconBox>
      </InsideContainerTwo>
    </CardContainer>
  );
}
