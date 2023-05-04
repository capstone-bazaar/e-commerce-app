import React from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import { CategoriesContainer } from '../components/Cards/CategoriesStyle';
import ProductCategories from '../components/Cards/Categories';
import CategoriesData from '../components/Cards/CategoriesData';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../queries/product';

export default function ProductsPage() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <PageWithNavbar>
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
              imageURLs: string[];
              title: string;
              description: string;
              seller: { fullName: string; avatarURL: string };
              points: string;
              currency: string;
            },
            index: number
          ) => {
            return (
              <Card
                price={product.price}
                image={product.imageURLs[0]}
                title={product.title}
                description={product.description}
                sellerImage={product.seller.avatarURL}
                sellerName={product.seller.fullName}
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
