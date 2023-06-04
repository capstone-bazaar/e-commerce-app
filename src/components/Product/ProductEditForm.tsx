import styled from 'styled-components';
import { Input } from '../Input/Input';
import TextArea from '../Input/TextArea';
import { Button } from '../Buttons/Button';
import { Label } from '../Labels/Label';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../queries/product';
import { toast } from 'react-toastify';
import SelectField from '../Input/SelectField';
import { GET_ALL_CATEGORIES } from '../../queries/category';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

interface ProductInterface {
  id: string;
  title: string;
  description: string;
  price: number;
  stockCount: number;
  category: {
    title: string;
    id: string;
  };
  imageURLs: string[];
}
export default function ProductEditForm({
  product,
}: {
  product: ProductInterface;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES, {
    fetchPolicy: 'cache-first',
  });

  const [productForm, setProductForm] = useState({
    title: product.title || '',
    description: product.description || '',
    price: Number(product.price) || Number(0),
    stockCount: Number(product.stockCount) || Number(0),
    category: {
      label: product?.category?.title || '',
      value: product?.category?.id || '',
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSelectFieldChange = ({
    value,
    name,
    label,
  }: {
    value: string;
    name: string;
    label: string;
  }) => {
    setProductForm({ ...productForm, [name]: { label, value } });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateProduct({
        variables: {
          fields: {
            ...productForm,
            productID: product.id,
            category: productForm.category.value,
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

  if (loading) <div>Loading...</div>;
  if (error) <div>Something went wrong</div>;

  return (
    <>
      <Title>Edit Product</Title>
      <FormContainer>
        <Label>Title</Label>
        <Input
          name="title"
          value={productForm.title}
          onChange={handleFormChange}
        />
        <Label>Description</Label>
        <TextArea
          height="200px"
          name="description"
          value={productForm.description}
          onChange={handleFormChange}
        />

        <Label>Price</Label>
        <Input
          type="number"
          name="price"
          min={0}
          value={productForm.price}
          onChange={handleFormChange}
        />

        <Label>Quantity</Label>
        <Input
          type="number"
          min={0}
          name="stockCount"
          value={productForm.stockCount}
          onChange={handleFormChange}
        />

        <Label>Category</Label>

        <SelectField
          defaultValue={productForm.category}
          name="category"
          options={data?.getAllCategories?.map(
            (category: { id: string; title: string }) => {
              return {
                label: category.title,
                value: category.id,
              };
            }
          )}
          onChange={(e) => handleSelectFieldChange({ ...e, name: 'category' })}
        />

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
