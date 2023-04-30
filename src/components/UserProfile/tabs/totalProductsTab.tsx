import { CardBox } from '../../Cards/CardStyles';
import Card from '../../Cards/Cards';

export default function TotalPrdouctTab({ data }: { data: any }) {
  return (
    <CardBox style={{ marginTop: '10px' }}>
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
  );
}
