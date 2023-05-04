import PageWithNavbar from '../Templates/PageWithNavbar';
import { useQuery } from '@apollo/client';
import Card from '../Cards/Cards';
import { CardBox } from '../Cards/CardStyles';
import GET_ACTIVE_PRODUCT from './ActiveProductData';
export default function ActiveProduct() {
  const { loading, error, data } = useQuery(GET_ACTIVE_PRODUCT);
  if (loading) {
    return <div>Error</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <PageWithNavbar>
      <h1>Active Order</h1>
      <label>Welcome to the active order page</label>
      <CardBox style={{ marginTop: '10px' }}>
        {data.findProductById.map(
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
    </PageWithNavbar>
  );
}
