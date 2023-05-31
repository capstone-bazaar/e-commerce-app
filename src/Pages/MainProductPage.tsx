import { useEffect } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
// import { CategoriesContainer } from '../components/Cards/CategoriesStyle';
// import ProductCategories from '../components/Cards/Categories';
// import CategoriesData from '../components/Cards/CategoriesData';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../queries/product';
import { useNavigate } from 'react-router-dom';
import { ContainerBox } from './Product';
import SearchBar from '../components/SearchBar/SearchBar';

export default function ProductsPage() {
  const [getProducts, { error, loading, data, called }] = useLazyQuery(
    GET_ALL_PRODUCTS,
    {
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    getProducts();

    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  if (called && loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const handleSearch = (searchText: string) => {
    return getProducts({
      variables: { filters: { byTitle: searchText } },
    });
  };

  return (
    <PageWithNavbar>
      <ContainerBox>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            marginBottom: '100px',
          }}
        >
          <SearchBar onSearch={(searchText) => handleSearch(searchText)} />
        </div>
        {/* <CategoriesContainer>
        {CategoriesData.map((data, index) => {
          return (
            <ProductCategories
              categoriesName={data.categoriesName}
              categoriesImage={data.categoriesImage}
            />
          );
        })}
      </CategoriesContainer> */}

        {data && data.findAllProducts.length > 0 ? (
          <CardBox>
            {data.findAllProducts.map(
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
                    onClick={() => navigate(`/products/${product.id}`)}
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
        ) : (
          <div
            style={{ opacity: 0.3, display: 'flex', justifyContent: 'center' }}
          >
            <img
              style={{ display: 'flex', justifyContent: 'center' }}
              src="/assets/empty_search_result.png"
              alt="empty search result"
            />
          </div>
        )}
      </ContainerBox>
    </PageWithNavbar>
  );
}
