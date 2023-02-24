import { Logo } from '../../assests/icons';
import { Nav, NavLink, NavMenu } from './styles';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo />
        </NavLink>{' '}
        <NavMenu>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
