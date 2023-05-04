import React from 'react';
import { gql, useQuery } from '@apollo/client';

import vegetables from '../Cards/vegetables.png';
import furnitures from '../Cards/furnitures.png';
import instrument from '../Cards/drum.png';
import textiles from '../Cards/beach.png';
import others from '../Cards/hand.png';
const CategoriesData = gql`
  query CategoriesData {
    price
    image
    productName
    description
    sellerImage
    sellerName
    points
  }
`;

export default CategoriesData;
