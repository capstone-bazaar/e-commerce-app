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
              title: string;
              description: string;
              sellerImage: string;
              sellerName: string;
              avgRate: number;
              currency: string;
            },
            index: number
          ) => {
            return (
              <Card
                key={index}
                price={product.price}
                image={product.imageURL}
                title={product.title}
                description={product.description}
                sellerImage={product.sellerImage}
                sellerName={product.sellerName}
                avgRate={product.avgRate}
                currency={product.currency}
              />
            );
          }
        )}
      </CardBox>
    </PageWithNavbar>
  );
}
