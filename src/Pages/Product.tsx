import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AddToCartIcon, UserProfileIcon } from '../assests/icons';
import { Button } from '../components/Buttons/Button';
import TextButton from '../components/Buttons/TextButton';
import CommentItem from '../components/Comment/CommentItem';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import RateStars from '../components/RateStars/RateStars';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { GET_PRODUCT, GET_USER_ADDED_PRODUCTS } from '../queries/product';
import { ADD_TO_CART, GET_ME } from '../queries/user';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Drawer from '../components/Drawer/Drawer';
import ProductEditForm from '../components/Product/ProductEditForm';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  border-radius: 5px;

  @media (max-width: 768px) {
    display: block;
  }
`;
const CarouselContainer = styled.div`
  flex: 1;
`;
const PurchaseContainer = styled.div`
  flex: 1;
  padding: 30px;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: rgba(92, 96, 97, 0.9);
`;
const ProductName = styled.div`
  font-size: 30px;
`;
const Price = styled.div`
  font-size: 30px;
  font-weight: 700;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

const ProductDescription = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PriceAndRateContainer = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SellerContainer = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 5px;
  padding: 15px;
`;

export const ContainerBox = styled.div`
  box-sizing: border-box;

  padding: 60px 30px;
`;

export const CommentList = styled.div`
  width: 100%;
`;

interface CommentInterface {
  user: {
    avatarURL: string;
    fullName: string;
  };

  createdAt: Date;
  rate: number;
  comment: string;
}

export default function ProductPage() {
  const { id } = useParams();

  const { userID } = useAuth();

  const { data, error, loading } = useQuery(GET_PRODUCT, {
    variables: { productID: id },
  });

  const {
    data: userProductData,
    error: userProductError,
    loading: userProductLoading,
  } = useQuery(GET_USER_ADDED_PRODUCTS);

  const [addProductToShoppingCart] = useMutation(ADD_TO_CART);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const addToCart = async () => {
    try {
      await addProductToShoppingCart({
        variables: {
          productId: id,
        },
        refetchQueries: [GET_ME],
      });

      toast.success('Added to cart 🚀', {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      toast.error('Something went wrong.', {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  if (loading || userProductLoading) return <div>Loading...</div>;
  if (error || userProductError) return <div>Error!</div>;

  return (
    <PageWithNavbar>
      <ToastContainer />

      <Drawer isOpen={isDrawerOpen} setDrawerIsOpen={setIsDrawerOpen}>
        <ProductEditForm product={data.findProductById} />
      </Drawer>
      <ContainerBox>
        <Container>
          <CarouselContainer>
            <ImageCarousel images={[...data.findProductById.imageURLs]} />
          </CarouselContainer>
          <PurchaseContainer>
            <ProductName>{data.findProductById.title}</ProductName>
            <PriceAndRateContainer>
              <Price>
                {data.findProductById.price}{' '}
                <span>{data.findProductById.currency}</span>
              </Price>
              <div>
                <RateStars rate={data.findProductById.avgRate} />
                <TextButton href="#comments-list">See all reviews</TextButton>
              </div>
            </PriceAndRateContainer>
            <SellerContainer>
              <div style={{ marginBottom: '5px' }}>Seller</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {data?.findProductById?.seller?.avatarURL ? (
                  <img
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                    alt="seller_img"
                    src={data.findProductById.seller.avatarURL}
                  />
                ) : (
                  <UserProfileIcon />
                )}

                <TextButton
                  href={
                    userID === data.findProductById.seller.id
                      ? `/profile`
                      : `/profile/${data.findProductById.seller.id}`
                  }
                >
                  {data.findProductById.seller.fullName}
                </TextButton>
              </div>
            </SellerContainer>
            {userProductData?.me?.products
              //eslint-disable-next-line
              .map((product: any) => product.id)
              .includes(id) ? (
              <Button
                style={{ width: '100%', marginTop: '20px' }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ marginRight: '8px' }}>Update</span>{' '}
                </div>
              </Button>
            ) : (
              <Button
                style={{ width: '100%', marginTop: '20px' }}
                onClick={addToCart}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ marginRight: '8px' }}>Add to Cart</span>{' '}
                  <AddToCartIcon />
                </div>
              </Button>
            )}
            <ProductDescription>
              {data.findProductById.description}
            </ProductDescription>
          </PurchaseContainer>
        </Container>

        <div
          style={{
            fontSize: '30px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px',
          }}
        >
          Comments ({data.findProductById.comments.length}){' '}
          <hr style={{ flex: 1, height: '0px', marginLeft: '30px' }} />
        </div>

        <CommentList id="comments-list">
          {data.findProductById.comments.map(
            (comment: CommentInterface, index: number) => {
              return (
                <CommentItem
                  key={index}
                  profileImage={comment.user.avatarURL}
                  buyerName={comment.user.fullName}
                  createdAt={comment.createdAt}
                  rate={comment.rate}
                  comment={comment.comment}
                />
              );
            }
          )}
        </CommentList>
      </ContainerBox>
    </PageWithNavbar>
  );
}
