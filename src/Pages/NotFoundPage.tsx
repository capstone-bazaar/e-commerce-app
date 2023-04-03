import React from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from '../components/container';
import { Button } from '../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  margin-top: 50px;
  margin-left: 25px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
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
      <ContainerBox>
        <Image src="/assets/questionmark_image.png"></Image>

        <TextContainer>
          <h1>404 NOT FOUND PAGE !</h1>

          <Button
            onClick={() => navigate('/')}
            style={{ width: '200px', marginLeft: '90px', marginTop: '75px' }}
          >
            Return Home Page
          </Button>
        </TextContainer>
      </ContainerBox>
    </PageWithNavbar>
  );
}
