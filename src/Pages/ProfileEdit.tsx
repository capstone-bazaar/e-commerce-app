import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from '../components/container';
import { Label } from '../components/Labels/Label';
import { Button } from '../components/Buttons/Button';
import { UPDATE_USER } from '../queries/user';
import { Input } from '../components/Input/Input';
import { Form } from '../components/Forms/Form';
import { object, string, ValidationError, array } from 'yup';
import styled from 'styled-components';
import { AddButton } from '../components/Buttons/AddButton';
import { Upload } from 'antd';
import { getBase64 } from '../utils/helpers';

import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export const ErrorMessage = styled.text`
  margin-top: 15px;
  color: red;
  font-size: small;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  box-sizing: border-box;
`;

export default function EditPage() {
  const editSchema = object().shape({
    fullName: string().required('Fullname is required'),
    phone: string().required('Phone number is required'),
    addresses: array(string()),
    email: string().email().required('Email is required'),
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const [editData, setEditData] = useState({
    image: '',
    fullName: '',
    phone: '',
    addresses: [''],
    email: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setError] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [base64List, setBase64List] = useState<Array<string>>([]);
  const [isLoading] = useState(false);

  const handleChangeEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'addresses') {
      const formValues = { ...editData };
      formValues.addresses[0] = value;
      return setEditData({ ...formValues });
    }
    setEditData({ ...editData, [name]: value });
  };

  const handleOnClickButton = async () => {
    //console.log(base64List[0]);
    editSchema
      .validate(editData)
      .then(async () => {
        if (!errors || errors === '') {
          const { fullName, phone, addresses, email } = editData;
          await updateUser({
            variables: {
              fields: {
                image: base64List[0],
                fullName,
                phone,
                addresses,
                email,
              },
            },
          });
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
      editData.phone &&
      editData.addresses &&
      editData.email
    ) {
      return setIsButtonDisabled(false);
    } else {
      return setIsButtonDisabled(true);
    }
  }, [editData]);

  const handleUpload = async (file: RcFile) => {
    const base64 = await getBase64(file);
    setBase64List((prevList) => [...prevList, base64]);
    return false;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    if (index > -1) {
      setFileList((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 1);
        return newList;
      });
      setBase64List((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 1);
        return newList;
      });
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <PageWithNavbar>
      <ContainerBox>
        <FormWrapper>
          <Upload
            listType="picture-circle"
            fileList={fileList}
            beforeUpload={handleUpload}
            onChange={handleFileChange}
            onRemove={handleRemove}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
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

          <br></br>
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Button onClick={handleOnClickButton} disabled={isButtonDisabled}>
            Save
          </Button>
        </FormWrapper>
      </ContainerBox>
    </PageWithNavbar>
  );
}
