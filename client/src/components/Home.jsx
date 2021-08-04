import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import IngredientsList from './IngredientsList';
import SearchRecipes from './SearchRecipes';

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const Content = styled.div`
  display: flex;
  border: 1px solid #2d2d2d;
`;

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <HomeDiv>
      <NavBar />
      <h1>Hi user: {userId}</h1>
      <SearchBar />
      <Content>
        <IngredientsList />
        <SearchRecipes />
      </Content>
    </HomeDiv>
  );
};

export default Home;
