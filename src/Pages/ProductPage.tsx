import React from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import GET_PRODUCTS from '../components/Cards/CardData';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import { CategoriesContainer } from '../components/Cards/CategoriesStyle';
import ProductCategories from '../components/Cards/Categories';
import CategoriesData from '../components/Cards/CategoriesData';
import { Title } from '../components/Cards/ProductPageStyle';
import { useQuery } from '@apollo/client';

export default function ProductsPage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <PageWithNavbar>
      <Title>Welcome,</Title>
      <title>ProductPage</title>
      {/* <CategoriesContainer>
        {CategoriesData.map((data, index) => {
          return (
            <ProductCategories
              categoriesName={data.categoriesName}
              categoriesImage={data.categoriesImage}
            />
          );
        })}
      </CategoriesContainer> */}
      <CardBox>
        {data.findAllProducts.map(
          (
            product: {
              price: string;
              imageURL: string;
              productName: string;
              description: string;
              sellerImage: string;
              sellerName: string;
              points: string;
              currency: string;
            },
            index: number
          ) => {
            return (
              <Card
                price={product.price}
                image={product.imageURL}
                productName={product.productName}
                description={product.description}
                sellerImage={product.sellerImage}
                sellerName={product.sellerName}
                points={product.points}
                currency={product.currency}
              />
            );
          }
        )}
      </CardBox>
    </PageWithNavbar>
  );
}
