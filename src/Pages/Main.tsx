import styled from 'styled-components';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { Button } from '../components/Buttons/Button';
import { ContainerBox } from '../components/container';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const Image = styled.img`
  max-width: 553px;
  max-height: 564px;
  margin-left: 41px;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;
const TextContainer = styled.div`
  width: 40%;
  height: 100%;
  margin-top: 60px;
  margin-left: 125px;

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
const Header = styled.div`
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 27px;
`;
const Text = styled.p`
  font-size: 20px;
  font-weight: 300;
  display: block;
`;

export default function MainPage() {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === true) {
      navigate('/products');
    }
    //eslint-disable-next-line
  }, []);

  return (
    <PageWithNavbar
      button={
        <Button onClick={() => navigate('/login')} style={{ width: '153px' }}>
          Login
        </Button>
      }
    >
      <ContainerBox>
        <Container>
          <Image src="/assets/mainpage_image.png"></Image>
          <TextContainer>
            <Header>MyBazaar</Header>
            <Text style={{ marginBottom: '56px' }}>
              Buyer or seller? Why choose? Our online marketplace lets you do
              both. With just a few clicks, you can switch between buying and
              selling modes.
            </Text>
            <Text>
              Join our community today and experience the best of both worlds.
            </Text>
            <Button
              onClick={() => navigate('/signup')}
              style={{ width: '153px', marginTop: '56px' }}
            >
              Join
            </Button>
          </TextContainer>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
