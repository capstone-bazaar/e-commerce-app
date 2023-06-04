import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from '../components/container';
import { Label } from '../components/Labels/Label';
import { Button } from '../components/Buttons/Button';
import { GET_ME, UPDATE_USER } from '../queries/user';
import { Input } from '../components/Input/Input';

import { object, string, ValidationError } from 'yup';
import styled from 'styled-components';

import { Space, Upload } from 'antd';
import { getBase64 } from '../utils/helpers';

import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from '../components/Input/TextArea';

import { toast, ToastContainer } from 'react-toastify';

export const ErrorMessage = styled.text`
  margin-top: 15px;
  color: red;
  font-size: small;
`;

export default function EditPage() {
  const editSchema = object().shape({
    fullName: string().required('Fullname is required'),
    phone: string().required('Phone number is required'),
    addresses: string().required('Address number is required'),
    email: string().email().required('Email is required'),
  });

  const { data, loading, error } = useQuery(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);

  const [editData, setEditData] = useState({
    image: '',
    fullName: '',
    phone: '',
    addresses: '',
    email: '',
    addressTitle: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setError] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [base64List, setBase64List] = useState<Array<string>>([]);
  const [isLoading] = useState(false);

  //eslint-disable-next-line
  useEffect(() => {
    if (data) {
      setEditData({
        image: '',
        fullName: data?.me?.fullName || '',
        phone: data?.me?.phone || '',
        addresses: data?.me?.addresses[0]?.address || '',
        email: data?.me?.email || '',
        addressTitle: data?.me?.addresses[0]?.title || '',
      });

      if (data?.me?.avatarURL) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: data?.me?.avatarURL,
          },
        ]);
      }
    }
  }, [data]);

  const handleChangeEditData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setEditData({ ...editData, [name]: value });
  };

  const handleOnClickButton = async () => {
    editSchema
      .validate(editData)
      .then(async () => {
        if (!errors || errors === '') {
          const { fullName, phone, addresses, addressTitle, email } = editData;
          await updateUser({
            variables: {
              fields: {
                image: base64List[0],
                fullName,
                phone,
                addresses: [{ title: addressTitle, address: addresses }],
                email,
              },
            },
          });
          toast.success('Successfully updated');
        }
      })
      .catch((errors) => {
        toast.error('Something went wrong!');
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

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <PageWithNavbar>
      <ToastContainer />
      <ContainerBox>
        <Space style={{ width: '100%' }} direction="vertical" align="center">
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
            value={editData.fullName}
            style={{ width: '400px' }}
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
            value={editData.phone}
            style={{ width: '400px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
            type={'phone'}
            placeholder={'Please enter your phone number'}
            name={'phone'}
          />
          <Label>Address Title</Label>
          <Input
            value={editData.addressTitle}
            style={{ width: '400px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
            placeholder={'Please enter address title'}
            name={'addressTitle'}
          />
          <Label>Adress</Label>
          <TextArea
            value={editData.addresses}
            style={{ width: '400px' }}
            placeholder={'Please add your address'}
            id="address"
            name={'addresses'}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChangeEditData(event);
            }}
          />

          <Label>E-mail</Label>
          <Input
            value={editData.email}
            style={{ width: '400px' }}
            type={'email'}
            placeholder={'Please enter your e-mail'}
            name={'email'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEditData(event);
            }}
          ></Input>

          <br></br>
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Button
            style={{ width: '400px' }}
            onClick={handleOnClickButton}
            disabled={isButtonDisabled}
          >
            Save
          </Button>
        </Space>
      </ContainerBox>
    </PageWithNavbar>
  );
}
