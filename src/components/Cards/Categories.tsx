import React from 'react';
import {
  CategoriesBox,
  CategoriesBoxTwo,
  CategoriesImg,
  CategoriesText,
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
        <CategoriesImg src={categoriesImage} />
        <CategoriesText>{categoriesName}</CategoriesText>
      </CategoriesBoxTwo>
    </CategoriesBox>
  );
}
