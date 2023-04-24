import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { Container, ContainerBox } from '../components/container';
import { Label } from '../components/Labels/Label';
import { Button } from '../components/Buttons/Button';
import { REGISTER } from '../queries/user';
import { Input } from '../components/Input/Input';
import { Form } from '../components/Forms/Form';
import { object, string, ValidationError } from 'yup';
import styled from 'styled-components';
import { AddButton } from '../components/Buttons/AddButton';
export const ErrorMessage = styled.text`
  margin-top: 15px;
  color: red;
  font-size: small;
`;
export default function EditPage() {
  const editSchema = object().shape({
    fullName: string().required('Fullname is required'),
    phoneNumber: string().required('Phone number is required'),
    address: string().required('Address is required'),
    email: string().email().required('Email is required'),

    password: string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  const [register, { error }] = useMutation(REGISTER);

  const [editData, setEditData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setError] = useState('');

  const handleChangeEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleOnClickButton = async () => {
    editSchema
      .validate(editData)
      .then(async () => {
        if (!errors || errors === '') {
          const { fullName, phoneNumber, address, email, password } = editData;
          const { data } = await register({
            variables: {
              fullName,
              phoneNumber,
              address,
              email,
              password,
            },
          });
          if (!error && data && data.register) {
            return { token: data.register };
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
      editData.fullName &&
      editData.phoneNumber &&
      editData.address &&
      editData.email &&
      editData.password
    ) {
      return setIsButtonDisabled(false);
    } else {
      return setIsButtonDisabled(true);
    }
  }, [editData]);

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Container>
          <Label>Full Name</Label>
          <Input
            type={'text'}
            placeholder={'Please enter your name and surname'}
            id="name"
            name={'fullName'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
          />
          <Label>Phone</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
            type={'phone'}
            placeholder={'Please enter your phone number'}
            name={'phone'}
          />
          <Label>Adress</Label>
          <Form
            type={'text'}
            placeholder={'Please add your address'}
            id="address"
            name={'address'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
          ></Form>
          <AddButton>Add Address</AddButton>
          <Label>E-mail</Label>
          <Input
            type={'email'}
            placeholder={'Please enter your e-mail'}
            name={'email'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
          ></Input>

          <Label>Password</Label>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
            type={'password'}
            placeholder={'Please enter your password'}
            name={'password'}
          />

          <br></br>
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Button onClick={handleOnClickButton} disabled={isButtonDisabled}>
            Save
          </Button>
        </Container>
      </ContainerBox>
    </PageWithNavbar>
  );
}
