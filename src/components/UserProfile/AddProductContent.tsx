import styled from 'styled-components';
import { Input } from '../Input/Input';
import TextArea from '../Input/TextArea';
import { Button } from '../Buttons/Button';
import { Label } from '../Labels/Label';

import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../queries/product';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;
export default function AddProductForm() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [base64List, setBase64List] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: 0,
    stockCount: 0,
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

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
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addProduct({
        variables: {
          fields: {
            ...productForm,
            images: base64List,
            price: Number(productForm.price),
            stockCount: Number(productForm.stockCount),
          },
        },
      });

      window.location.reload();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Title>Add Product</Title>
      <FormContainer>
        <Label>Title</Label>
        <Input name="title" onChange={handleFormChange} />
        <Label>Description</Label>
        <TextArea
          height="200px"
          name="description"
          onChange={handleFormChange}
        />

        <Label>Price</Label>
        <Input type="number" name="price" min={0} onChange={handleFormChange} />

        <Label>Quantity</Label>
        <Input
          type="number"
          min={0}
          name="stockCount"
          onChange={handleFormChange}
        />

        <Label>Product Images</Label>
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={handleUpload}
          onChange={handleFileChange}
          onRemove={handleRemove}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>

        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          style={{ width: '100%', marginTop: '20px' }}
        >
          Submit
        </Button>
      </FormContainer>
    </>
  );
}
