import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 25px;
  gap: 5px;

  @media (max-width: 768px) {
    border: none;
    box-shadow: none;
  }
`;
export const ContainerBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  margin-bottom: 10px;
`;

export const CheckboxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 5px;
`;
export const SocialMediaDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
  margin: 20px 0 20px 0;
`;
