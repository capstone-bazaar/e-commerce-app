import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { Container, ContainerBox } from '../components/container';
import { Label } from '../components/Labels/Label';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Buttons/Button';
import { REGISTER } from '../queries/user';
import { useAuth } from '../context/AuthContext';
import { object, string, ref, ValidationError } from 'yup';
import { ErrorMessage } from './Login';

export default function SignUpSchema() {
  const signupSchema = object().shape({
    fullName: string().required('Fullname is required'),

    email: string().email().required('Email is required'),

    password: string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Passwords do not match')
      .required('Confirm Password is required'),

    phone: string().required('Phone number is required'),
  });

  const [register, { error }] = useMutation(REGISTER);

  const { signup } = useAuth();

  const [signupData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setError] = useState('');

  const handleChangeSignUpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignUpData({ ...signupData, [name]: value });
  };

  const handleOnClickButton = async () => {
    signupSchema
      .validate(signupData)
      .then(async () => {
        if (!errors || errors === '') {
          const { fullName, email, password, phone } = signupData;

          const { data } = await register({
            variables: {
              fullName,
              email,
              password,
              phone,
            },
          });

          if (!error && data && data.register) {
            return signup({
              token: data.register.token,
              user: data.register.user,
            });
          }
        }
      })
      .catch((errors) => {
        if (errors instanceof ValidationError) {
          setError(errors.message);
        }
      });
  };

  useEffect(() => {
    if (
      signupData.email &&
      signupData.phone &&
      signupData.fullName &&
      signupData.password &&
      signupData.confirmPassword
    ) {
      return setIsButtonDisabled(false);
    } else {
      return setIsButtonDisabled(true);
    }

    // eslint-disable-next-line
  }, [signupData]);

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          <h1>Hi, there!</h1>
          <Label>Are you ready for a new adventure?</Label>
          <Label>Full Name</Label>
          <Input
            type={'text'}
            placeholder={'Please enter your name and surname'}
            id="name"
            name={'fullName'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
          />
          <Label>E-mail</Label>
          <Input
            type={'email'}
            placeholder={'Please enter your e-mail'}
            name={'email'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
          ></Input>
          <Label>Phone</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
            type={'phone'}
            placeholder={'Please enter your phone number'}
            name={'phone'}
          />
          <Label>Password</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
            type={'password'}
            placeholder={'Please enter your password'}
            name={'password'}
          />
          <Label>Confirm Password</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeSignUpData(event);
            }}
            name={'confirmPassword'}
            type={'password'}
            placeholder={'Please confirm your password'}
          ></Input>
          <br></br>
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Button onClick={handleOnClickButton} disabled={isButtonDisabled}>
            Sign up
          </Button>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
