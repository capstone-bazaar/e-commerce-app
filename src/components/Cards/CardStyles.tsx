import styled from 'styled-components';
export const CardContainer = styled.div`
  box-sizing: border-box;
  width: 240px;
  height: 300px;
  cursor: pointer;
  background-color: white;
 box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 270px;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const AddProductCard = styled.div`
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 240px;
  height: 300px;
  cursor: pointer;
  border: 4px dashed #575757;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;

  transition: transform 0.2s;

  &:hover {
    border: 4px dashed #ea004b;
    transform: scale(1.05);
  }
`;

export const ImgContainer = styled.div`
  border-radius: 20px 20px 1px 1px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;
export const InsideContainerTwo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  padding-right: 10px;
  padding-left: 10px;
`;

export const BoxOne = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.label`
  font-weight: bold;
  font-size: 20px;
`;

export const CardLabel = styled.label`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.39);
  font-weight: 400px;
`;
export const PointLabel = styled.label`
  padding-top: 5px;
`;
export const VerticalLine = styled.div`
  border-left: 1px solid #000000;
`;

export const CardBox = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  width: 100%;
`;
export const ProductPrice = styled.div`
  box-sizing: border-box;
  border: 3px solid #000000;
  border-radius: 20px;
  width: 75px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #ffffff;
  text-align: center;
  font-weight: 800;
  display: flex;
  justify-content: center;
`;
export const SellerName = styled.div`
  font-size: 10px;
  font-weight: 800;
`;
export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
