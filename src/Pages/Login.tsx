import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { LOGIN } from '../queries/user';
import './App.css';
import { Button } from '../components/Buttons/button';
import { Container, ContainerBox, CheckboxDiv } from '../components/container';
import { Label } from '../components/Labels/label';

export default function Login() {
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const handleChangeLoginData = (e: any) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleOnClick = () => {
    login({
      variables: { email: loginData.email, password: loginData.password },
    });
  };

  return (
    <ContainerBox>
      <Container>
        <h1>Welcome!</h1>
        <p>Please for the login enter e-mail and password </p>
        <Label className="Label">E-mail</Label>
        <Input
          placeholder={'Enter the email'}
          type={'text'}
          id="email"
          className="text-input"
          name={'email'}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            handleChangeLoginData(event);
          }}
        ></Input>
        <Label>Password</Label>
        <Input
          placeholder={'Enter your password'}
          type={'password'}
          name={'password'}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            handleChangeLoginData(event);
          }}
        ></Input>
        <CheckboxDiv>
          <Label>Remember Me</Label>
          <input type={'checkbox'}></input>
        </CheckboxDiv>
        <Button type={'submit'} onClick={handleOnClick}>
          LOGIN
        </Button>
        <p>Dont have an account click here</p>
      </Container>
    </ContainerBox>
  );
}
