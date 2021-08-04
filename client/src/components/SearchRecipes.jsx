import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import SearchRecipeItem from './SearchRecipeItem';

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  margin: 0 !important;
`;

const SearchRecipes = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const [searchedRecipes, setSearcedRecipes] = useState([]);

  useEffect(async () => {
    const ingredientsArr = ingredients.map((ingredient) => ingredient.name);
    const response = await axios.post('/recipes/search', { ingredientsArr });
    setSearcedRecipes(response.data);
    console.log('searched recipes');
  }, [ingredients]);

  return (
    <RecipesContainer>
      <StyledTitle className="title is-3">Available recipes</StyledTitle>
      {searchedRecipes.map((recipe) => (
        <SearchRecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </RecipesContainer>
  );
};

export default SearchRecipes;
