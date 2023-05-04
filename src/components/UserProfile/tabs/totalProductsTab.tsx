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
              key={index}
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
  );
}
