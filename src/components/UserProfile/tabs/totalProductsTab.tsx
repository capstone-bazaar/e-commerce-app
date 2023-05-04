import { CardBox } from '../../Cards/CardStyles';
import Card from '../../Cards/Cards';

// eslint-disable-next-line
export default function TotalProductTab({ data }: { data: any }) {
  return (
    <CardBox style={{ marginTop: '10px' }}>
      {data.map(
        (
          product: {
            price: string;
            imageURLs: string[];
            productName: string;
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
              productName={product.productName}
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
