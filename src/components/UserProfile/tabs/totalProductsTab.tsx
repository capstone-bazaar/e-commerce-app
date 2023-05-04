import { useState } from 'react';
import { AddIcon } from '../../../assests/icons';
import { AddProductCard, CardBox } from '../../Cards/CardStyles';
import Card from '../../Cards/Cards';
import Drawer from '../../Drawer/Drawer';
import AddProductForm from '../AddProductContent';

// eslint-disable-next-line
export default function TotalProductTab({ data }: { data: any }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <CardBox style={{ marginTop: '10px' }}>
      <Drawer isOpen={isDrawerOpen} setDrawerIsOpen={setIsDrawerOpen}>
        <AddProductForm />
      </Drawer>
      <AddProductCard onClick={() => setIsDrawerOpen(true)}>
        <AddIcon />
      </AddProductCard>
      {data.map(
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
              key={index}
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
  );
}
