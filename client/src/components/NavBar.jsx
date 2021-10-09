import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogOutButton from './LogOutButton';

const Logo = styled.img`
  width: 170px;
`;

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <Navbar className="is-fixed-top is-white">
      <Navbar.Brand>
        <Navbar.Item to="/" renderAs={Link}>
          <Logo src="/images/myPantryLogo.png" alt="logo" />
        </Navbar.Item>
        <Navbar.Burger onClick={toggleActive} />
      </Navbar.Brand>
      {isLoggedIn && (
        <Navbar.Menu className={isActive ? 'is-active' : ''}>
          <Navbar.Container align="right">
            <Navbar.Item>Favorites</Navbar.Item>
            <Navbar.Item>
              <LogOutButton />
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      )}
    </Navbar>
  );
};

export default NavBar;
