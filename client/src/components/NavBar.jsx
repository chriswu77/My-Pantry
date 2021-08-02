import React from 'react';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogOutButton from './LogOutButton';

const CustomNavBar = styled(Navbar)`
  display: flex;
`;

const CustomMenu = styled(Navbar.Menu)`
  display: flex;
  justify-content: flex-end !important;
  margin: 0 !important;
`;

const NavBar = () => {
  console.log('navbar');
  return (
    <CustomNavBar className="is-fixed-top is-dark">
      <Navbar.Brand className="ml-0">
        <Navbar.Item to="/" renderAs={Link}>
          Logo
        </Navbar.Item>
      </Navbar.Brand>
      <CustomMenu>
        <Navbar.Container className="is-justify-content-flex-end m-0">
          <Navbar.Item>Favorites</Navbar.Item>
          <Navbar.Item>
            <LogOutButton />
          </Navbar.Item>
        </Navbar.Container>
      </CustomMenu>
    </CustomNavBar>
  );
};

export default NavBar;
