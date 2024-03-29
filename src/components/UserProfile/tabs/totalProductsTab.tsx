import { useState } from 'react';
import { AddIcon } from '../../../assests/icons';
import { AddProductCard, CardBox } from '../../Cards/CardStyles';
import Card from '../../Cards/Cards';
import Drawer from '../../Drawer/Drawer';
import AddProductForm from '../AddProductContent';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line
export default function TotalProductTab({
  data,
  isOtherUser,
}: {
  //eslint-disable-next-line
  data: any;
  isOtherUser: boolean;
}) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <CardBox style={{ marginTop: '10px' }}>
      <Drawer isOpen={isDrawerOpen} setDrawerIsOpen={setIsDrawerOpen}>
        <AddProductForm />
      </Drawer>

      {!isOtherUser && (
        <AddProductCard
          id="add-product-card"
          onClick={() => setIsDrawerOpen(true)}
        >
          <AddIcon />
        </AddProductCard>
      )}
      {data.map(
        (
          product: {
            id: string;
            price: string;
            imageURLs: string[];
            title: string;
            description: string;
            seller: { fullName: string; avatarURL: string };
            avgRate: number;
            currency: string;
          },
          index: number
        ) => {
          return (
            <Card
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
              key={index}
              price={product.price}
              image={product.imageURLs[0]}
              title={product.title}
              description={product.description}
              sellerImage={product.seller.avatarURL}
              sellerName={product.seller.fullName}
              avgRate={product.avgRate}
              currency={product.currency}
            />
          );
        }
      )}
    </CardBox>
  );
}
