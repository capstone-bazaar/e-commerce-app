import styled from 'styled-components';
import { Logo, ShoppingCartIcon } from '../../assests/icons';
import { Nav, NavLink, NavMenu } from './styles';
import useShoppingCartStore from '../../stores/ShoppingCartStore';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../queries/user';
import { useNavigate } from 'react-router-dom';

const ShoppingCartContainer = styled.div`
  position: relative;
`;

const ItemCounterContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 50%;
  background: green;
  color: white;
  top: 0;
  right: -3px;
  width: 20px;
  height: 20px;
  font-size: 10px;
`;

const Navbar = ({ button }: { button: React.ReactNode }) => {
  const isAuth: boolean = localStorage.getItem('isAuth') === 'true';
  const itemCount = useShoppingCartStore((state) => state.itemCount);
  const initializeItemCount = useShoppingCartStore(
    (state) => state.initializeItemCount
  );

  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_ME);

  if (isAuth) {
    if (loading) <div>Loading...</div>;
    if (error) <div>Error!</div>;
    if (data) {
      initializeItemCount(data.me.shoppingCart.length || 0);
    }
  }

  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo />
        </NavLink>{' '}
        <NavMenu>
          {!isAuth && button}
          {isAuth && (
            <ShoppingCartContainer onClick={() => navigate('/checkout')}>
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <ItemCounterContainer>{itemCount}</ItemCounterContainer>
              )}
            </ShoppingCartContainer>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
