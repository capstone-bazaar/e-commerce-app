import React from 'react';
import {
  CategoriesBox,
  CategoriesBoxTwo,
  CategoriesImg,
  CategoriesText,
  CategoriesİnsideBox,
} from './CategoriesStyle';

export default function ProductCategories({
  categoriesName,
  categoriesImage,
}: {
  categoriesName: string;
  categoriesImage: string;
}) {
  return (
    <CategoriesBox>
      <CategoriesBoxTwo>
        <CategoriesİnsideBox>
          <CategoriesImg src={categoriesImage} />
          <CategoriesText>{categoriesName}</CategoriesText>
        </CategoriesİnsideBox>
      </CategoriesBoxTwo>
    </CategoriesBox>
  );
}
