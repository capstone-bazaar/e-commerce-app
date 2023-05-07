import styled from 'styled-components';
import {
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
import { Dropdown, Space, MenuProps } from 'antd';
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
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const Navbar = ({ button }: { button: React.ReactNode }) => {
  const isAuth: boolean = localStorage.getItem('isAuth') === 'true';
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
      label: <div onClick={() => navigate('/orders')}>My Orders</div>,
      icon: <OrdersIcon />,
    },
    {
      key: '2',
      label: <div onClick={() => navigate('/profile')}>Settings</div>,
      icon: <SettingsIcon />,
    },
    {
      key: '3',
      label: <div onClick={logout}>Logout</div>,
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
        <NavLink to="/">
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
                <Space>
                  <UserProfileIconContainer>
                    <UserProfileIcon />
                  </UserProfileIconContainer>
                </Space>
              </Dropdown>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
