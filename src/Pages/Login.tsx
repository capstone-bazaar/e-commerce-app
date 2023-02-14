import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LOGIN } from '../queries/user';
import './App.css';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 350px;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 6);
  border-radius: 10px;
  padding: 10px;
`;
const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Label = styled.label``;
const Button = styled.button``;
const Input = styled.input`
  border: 0;
  border-bottom: 2px solid #9e9e9e;
  outline: none;
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
`;
const Wrapper2 = styled.div`
  display: flex;
`;
const Text = styled.label`
  text-align: start;
  font-family: 'Roboto';
`;

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
    <Wrapper>
      <Container>
        <Label>Welcome!</Label>
        <Label>Please for the login enter e-mail and password </Label>
        <Text className="__label">E-mail</Text>
        <Input
          placeholder={'Enter the email'}
          type={'text'}
          id="email"
          className="__input"
          name={'email'}
          onChange={(event) => {
            handleChangeLoginData(event);
          }}
        ></Input>
        <Text>Password</Text>
        <Input
          placeholder={'Enter your password'}
          type={'password'}
          name={'password'}
          onChange={(event) => {
            handleChangeLoginData(event);
          }}
        ></Input>

        <Wrapper2>
          <Label>Remember Me</Label>
          <Input type={'checkbox'}></Input>
        </Wrapper2>
        <Button type={'submit'} onClick={handleOnClick}>
          Login
        </Button>
        <p>Dont have an account click here</p>
      </Container>
    </Wrapper>
  );
}
