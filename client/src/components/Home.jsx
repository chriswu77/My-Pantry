import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <HomeDiv>
      <NavBar />
      <h1>Hi from Home Page!! {userId}</h1>
      <SearchBar />
    </HomeDiv>
  );
};

export default Home;
