import styled from 'styled-components';
export const Button = styled.button`
  cursor: pointer;
  height: 48px;
  background-color: #ea004b;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.1rem;

  &:disabled {
    background-color: #c5c5c5;
  }
`;

export const SocialMediaButton = styled.button`
  cursor: pointer;
  height: 48px;
  background-color: #ea004b;
  color: white;
  border: none;
  border-radius: 70%;
  font-weight: bold;
  font-size: 1.1rem;
  width: 45px;

  &:disabled {
    background-color: #c5c5c5;
  }
`;
