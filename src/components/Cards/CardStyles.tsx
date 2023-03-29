import styled from 'styled-components';
export const CardContainer = styled.div`
  box-sizing: border-box;
  width: 270px;
  height: 300px;
  cursor: pointer;
  border: 1px solid #000000;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 13px;
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
export const InsideContainer2 = styled.div`
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
  display: flex;
  justify-content: center;
  gap: 20px;
`;
export const ProductPrice = styled.div`
  box-sizing: border-box;
  border: 3px solid #000000;
  border-radius: 20px;
  width: 75px;
  position: absolute;
  bottom: 0;
  right: 0;
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
