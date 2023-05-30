import { useEffect, useState } from 'react';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import Card from '../components/Cards/Cards';
import { CardBox } from '../components/Cards/CardStyles';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../queries/product';
import { useNavigate } from 'react-router-dom';
import { ContainerBox } from './Product';
import SearchBar from '../components/SearchBar/SearchBar';
import Modal from '../components/Modal/Modal';
import { GET_ALL_CATEGORIES } from '../queries/category';
import ModalCategoryItem from '../components/Category/ModalCategoryItem';
import styled from 'styled-components';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';

const ModalContentWrapper = styled.div`
  display: grid;
  column-gap: 15px;
  row-gap: 15px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-rows: repeat(2, minmax(200px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    grid-template-rows: repeat(3, minmax(150px, 1fr));
  }
`;

export default function ProductsPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_ALL_CATEGORIES, { fetchPolicy: 'cache-first' });

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

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsCategoryModalOpen(false);
    return getProducts({
      variables: { filters: { byCategory: categoryId } },
    });
  };

  const navigate = useNavigate();
  if ((called && loading) || categoryLoading) {
    return <div>loading</div>;
  }
  if (error || categoryError) {
    return <div>Error</div>;
  }

  const handleSearch = (searchText: string) => {
    return getProducts({
      variables: { filters: { byTitle: searchText } },
    });
  };

  return (
    <PageWithNavbar>
      {isCategoryModalOpen && (
        <Modal onClose={() => setIsCategoryModalOpen(false)}>
          <ModalContentWrapper>
            {categoryData.getAllCategories.map(
              (category: { id: string; title: string; imageURL: string }) => {
                return (
                  <ModalCategoryItem
                    title={category.title}
                    key={category.id}
                    id={category.id}
                    imageURL={category.imageURL}
                    selectedCategory={selectedCategory}
                    onSelected={(id) => handleCategoryChange(id)}
                  />
                );
              }
            )}
          </ModalContentWrapper>
        </Modal>
      )}
      <ContainerBox>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
            marginBottom: '70px',
          }}
        >
          <h2 style={{ marginBottom: '30px' }}>What are you looking for?</h2>
          <SearchBar onSearch={(searchText) => handleSearch(searchText)} />
        </div>
        <SecondaryButton
          style={{ width: '200px', margin: '20px 20px' }}
          onClick={() => setIsCategoryModalOpen(true)}
        >
          Categories
        </SecondaryButton>{' '}
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
