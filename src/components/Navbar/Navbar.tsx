import styled from 'styled-components';
import {
  CreditIcon,
  Logo,
  LogoutIcon,
  OrdersIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UserProfileIcon,
} from '../../assests/icons';
import { Nav, NavLink, NavMenu } from './styles';
import useShoppingCartStore from '../../stores/ShoppingCartStore';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../queries/user';
import { useNavigate } from 'react-router-dom';
import { Dropdown, MenuProps } from 'antd';
import { useAuth } from '../../context/AuthContext';

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
const UserProfileIconContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const MenuItem = styled.a`
  margin-left: 10px;
`;

const Navbar = ({ button }: { button: React.ReactNode }) => {
  const { isAuth } = useAuth();
  const itemCount = useShoppingCartStore((state) => state.itemCount);
  const initializeItemCount = useShoppingCartStore(
    (state) => state.initializeItemCount
  );
  const { logout } = useAuth();

  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_ME);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <MenuItem onClick={() => navigate('/orders')}>My Orders</MenuItem>,
      icon: <OrdersIcon />,
    },
    {
      key: '2',
      label: <MenuItem onClick={() => navigate('/profile')}>Settings</MenuItem>,
      icon: <SettingsIcon />,
    },
    {
      key: '3',
      label: <MenuItem onClick={() => navigate('/mb-money')}>Balance</MenuItem>,
      icon: <CreditIcon />,
    },
    {
      key: '4',
      label: <MenuItem onClick={logout}>Logout</MenuItem>,
      icon: <LogoutIcon />,
    },
  ];
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
        <NavLink to={isAuth ? '/products' : '/'}>
          <Logo />
        </NavLink>{' '}
        <NavMenu>
          {!isAuth && button}
          {isAuth && (
            <>
              <ShoppingCartContainer onClick={() => navigate('/checkout')}>
                <ShoppingCartIcon />
                {itemCount > 0 && (
                  <ItemCounterContainer>{itemCount}</ItemCounterContainer>
                )}
              </ShoppingCartContainer>
              <Dropdown menu={{ items }}>
                <UserProfileIconContainer>
                  <UserProfileIcon />
                </UserProfileIconContainer>
              </Dropdown>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
