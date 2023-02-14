import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './Header';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavLink to="/">Logo</NavLink> {/* logo anasayfaya yönlendirecek */}
        <NavMenu>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>{' '}
          {/*signin giriş sayfasına yönlenecek*/}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
