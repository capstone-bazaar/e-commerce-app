import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Input } from '../components/Input/Input';
import { LOGIN } from '../queries/user';
import { Button } from '../components/Buttons/Button';
import { Container, ContainerBox, CheckboxDiv } from '../components/container';
import { Label } from '../components/Labels/Label';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import TextButton from '../components/Buttons/TextButton';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const ErrorMessage = styled.text`
  margin-top: 15px;
  color: red;
  font-size: small;
`;

export default function LoginPage() {
  const [loginWithUserData, { error }] = useMutation(LOGIN);
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleOnClick = async () => {
    const { data } = await loginWithUserData({
      variables: { email: loginData.email, password: loginData.password },
    });

    if (data.login) {
      login({ token: data.login });
    }
  };

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          <h1>Welcome!</h1>
          <Label>E-mail</Label>
          <Input
            placeholder={'Enter the email'}
            type={'text'}
            id="email"
            name={'email'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeLoginData(event);
            }}
          />
          <Label>Password</Label>
          <Input
            placeholder={'Enter your password'}
            type={'password'}
            name={'password'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeLoginData(event);
            }}
          />
          <CheckboxDiv>
            Remember Me
            <input type={'checkbox'}></input>
          </CheckboxDiv>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <Button
            disabled={!loginData.email || !loginData.password}
            type={'submit'}
            onClick={handleOnClick}
            style={{ marginTop: '20px' }}
          >
            Log in
          </Button>

          <p>
            Don't have an account?{' '}
            <TextButton href="signup">Click here</TextButton>
          </p>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
