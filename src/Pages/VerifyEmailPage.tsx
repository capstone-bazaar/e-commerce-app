import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { Container, ContainerBox } from '../components/container';
import { DoneIcon, ErrorIcon } from '../assests/icons';
import { Button } from '../components/Buttons/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const VERIFY_USER = gql`
  mutation VerifyUser($verificationID: String, $id: String) {
    verifyUser(verificationID: $verificationID, id: $id)
  }
`;

const VerifyLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export default function VerifyEmailPage() {
  const [error, setError] = useState(false);
  const { isAuth } = useAuth();

  const [verifyUser, { loading }] = useMutation(VERIFY_USER);
  const [querystrings] = useSearchParams();

  useEffect(() => {
    const verifyUserWithID = async () => {
      try {
        await verifyUser({
          variables: {
            verificationID: querystrings.get('verify'),
            id: querystrings.get('id'),
          },
        });
      } catch (verifyUserError) {
        setError(true);
      }
    };

    verifyUserWithID();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          {!error && (
            <VerifyLinkContainer>
              <DoneIcon />
              <hr style={{ width: '100%' }} />
              <TextWrapper>
                Congratulations! Your email address has been successfully
                verified. You can now proceed to the login page to access your
                account.
              </TextWrapper>
              <Link style={{ width: '100%' }} to={'/'}>
                <Button style={{ width: '100%' }}>Go to Main Page</Button>
              </Link>
            </VerifyLinkContainer>
          )}
          {error && (
            <VerifyLinkContainer>
              <ErrorIcon />
              <hr style={{ width: '100%' }} />
              <TextWrapper>
                We're sorry, but your email address verification has failed.
                Please check your email for further instructions on how to
                verify your account.
              </TextWrapper>

              {isAuth && (
                <Button style={{ width: '100%' }}>
                  Resent Verification Link
                </Button>
              )}
            </VerifyLinkContainer>
          )}
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
