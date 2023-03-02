import Navbar from '../components/Navbar/Navbar';
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { Container, ContainerBox } from '../components/container';
import { Label } from '../components/Labels/label';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Buttons/button';
import { SIGNUP } from '../queries/user';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [signupWithUserData, { error }] = useMutation(SIGNUP);
  const navigate = useNavigate();
  const handleOnClickButton = () => {
    navigate('/profile');
  };
  const [signup, setSignUp] = useState({
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [button_data, setButtonData] = useState(true);
  const [errors, setError] = useState('');
  const handleChangeSignUpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignUp({ ...signup, [name]: value });
  };
  useEffect(() => {
    if (
      signup.password === signup.confirm_password &&
      signup.email &&
      signup.fullname &&
      signup.password &&
      signup.confirm_password
    ) {
      return setButtonData(false);
    } else {
      setError('Password and confirm password must  be same');
      return setButtonData(true);
    }
  }, [signup]);
  useEffect(() => {
    if (signup.password.length < 6) {
      return setError('Minimum password length should be 6');
    } else {
      return setError('');
    }
    console.log(signup);
  }, [signup]);
  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          <h1>Welcome to the registration screen</h1>
          <Label>Are you ready for a new adventure?</Label>
          <Label>Name-Surname</Label>
          <Input
            type={'text'}
            placeholder={'Please enter the name and surname'}
            id="name"
            name={'fullname'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
          />
          <Label>E-mail</Label>
          <Input
            type={'email'}
            placeholder={'Please enter the email'}
            name={'email'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
          ></Input>
          <Label>Password</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
            type={'password'}
            placeholder={'Please enter the password'}
            name={'password'}
          />
          <Label>Confirm Password</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
            name={'confirm_password'}
            type={'password'}
            placeholder={'Please confirm password'}
          ></Input>
          <br></br>
          <Button onClick={handleOnClickButton} disabled={button_data}>
            Return Login Page
          </Button>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
