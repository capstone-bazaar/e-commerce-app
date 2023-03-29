import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { object, string, ValidationError } from 'yup';
import { Input } from '../components/Input/Input';
import { LOGIN } from '../queries/user';
import { Button, SocialMediaButton } from '../components/Buttons/Button';
import {
  Container,
  ContainerBox,
  CheckboxDiv,
  SocialMediaDiv,
} from '../components/container';
import { Label } from '../components/Labels/Label';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import TextButton from '../components/Buttons/TextButton';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
export const ErrorMessage = styled.text`
  margin-top: 15px;
  color: red;
  font-size: small;
`;

const userSchema = object({
  email: string().email().required('Email is required'),
  password: string().required(),
});

export default function LoginPage() {
  const [loginWithUserData, { error }] = useMutation(LOGIN);
  const { login } = useAuth();
  const [validationError, setValidationError] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setLoginData({ ...loginData, rememberMe: !loginData.rememberMe });
  };
  const handleOnClick = async () => {
    userSchema
      .validate(loginData)
      .then(async () => {
        const { data } = await loginWithUserData({
          variables: { email: loginData.email, password: loginData.password },
        });

        if (data.login) {
          login({ token: data.login, rememberMe: loginData.rememberMe });
        }
      })
      .catch((errors) => {
        if (errors instanceof ValidationError) {
          setValidationError(errors.message);
        }
      });
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
            Remember me
            <input type={'checkbox'} onChange={handleCheckboxChange}></input>
          </CheckboxDiv>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
          <Button
            type={'submit'}
            onClick={handleOnClick}
            style={{ marginTop: '20px' }}
          >
            Log in
          </Button>
          <SocialMediaDiv>
            <SocialMediaButton>
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialMediaButton>
            <SocialMediaButton>
              <FontAwesomeIcon icon={faTwitter} />
            </SocialMediaButton>
            <SocialMediaButton>
              <FontAwesomeIcon icon={faGoogle} />
            </SocialMediaButton>
            <SocialMediaButton>
              <FontAwesomeIcon icon={faInstagram} />
            </SocialMediaButton>
            <SocialMediaButton>
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialMediaButton>
          </SocialMediaDiv>

          <p>
            Don't have an account?{' '}
            <TextButton href="signup">Click here</TextButton>
          </p>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
