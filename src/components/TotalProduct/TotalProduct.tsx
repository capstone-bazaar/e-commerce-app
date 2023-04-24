import PageWithNavbar from '../Templates/PageWithNavbar';

import { useQuery } from '@apollo/client';
import GET_TOTAL_PRODUCT from './TotalProductData';
import { CardBox } from '../Cards/CardStyles';
import Card from '../Cards/Cards';
export default function TotalProduct() {
  const { loading, error, data } = useQuery(GET_TOTAL_PRODUCT);
  if (loading) {
    return <div>Error</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <PageWithNavbar>
      <h1>Total Product Page</h1>
      <label>welcome to the product page</label>
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
    </PageWithNavbar>
  );
}
