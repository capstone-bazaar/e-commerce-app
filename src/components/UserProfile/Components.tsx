import styled from 'styled-components';

export const ProfileLabel = styled.label`
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 48px;
  color: #000000;
`;
export const DescriptionLabel = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.39);
`;
export const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ProductProfileBox = styled.div`
  background-color: #ffffff;
  border: 1px dashed #000000;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 170px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 0;
  margin-top: 100px;
`;
export const OrderBox = styled.div`
  background-color: #ffffff;
  border: 1px dashed #000000;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 170px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HorizontalLine = styled.div`
  border: 1px solid rgba(153, 153, 153, 0.31);
  width: 1100px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;