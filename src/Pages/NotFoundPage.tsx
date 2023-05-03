import React from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';

import { Button } from '../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const ContainerError = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Image = styled.img`
  max-width: 500px;
  max-height: 400px;
  margin-top: 50px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;
const TextContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    padding: 20px;
    align-items: center;
    margin-top: 0px;
  }
`;

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PageWithNavbar>
      <ContainerError>
        <Image src="/assets/404NotFoundPage_image.png"></Image>

        <TextContainer>
          <h1>404 NOT FOUND !</h1>

          <Button onClick={() => navigate('/')} style={{ marginTop: '10px' }}>
            Return Home Page
          </Button>
        </TextContainer>
      </ContainerError>
    </PageWithNavbar>
  );
}
