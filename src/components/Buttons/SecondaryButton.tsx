import styled from 'styled-components';

export const SecondaryButton = styled.button`
  cursor: pointer;
  height: 48px;
  border: 1px solid #ea004b;
  color: #ea004b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  background: white;

  &:disabled {
    border: 1px solid #c5c5c5;
    color: #c5c5c5;
  }
`;
