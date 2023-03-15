import React from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import CardDatas from '../components/Cards/CardData';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import { CategoriesContainer } from '../components/Cards/CategoriesStyle';
import ProductCategories from '../components/Cards/Categories';
import CategoriesData from '../components/Cards/CategoriesData';
import { Title } from '../components/Cards/ProductPageStyle';

export default function ProductPage() {
  return (
    <div>
      <PageWithNavbar>
        <Title>Welcome,</Title>
        <title>ProductPage</title>
        <CategoriesContainer>
          {CategoriesData.map((data, index) => {
            return (
              <ProductCategories
                categoriesName={data.categoriesName}
                categoriesImage={data.categoriesImage}
              />
            );
          })}
        </CategoriesContainer>
        <CardBox>
          {CardDatas.map((data, index) => {
            return (
              <Card
                price={data.price}
                image={data.image}
                productName={data.productName}
                description={data.description}
                consumerImage={data.consumerImage}
                consumerName={data.consumerName}
                points={data.points}
              />
            );
          })}
        </CardBox>
      </PageWithNavbar>
    </div>
  );
}
