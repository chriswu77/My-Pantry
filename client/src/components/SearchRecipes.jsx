import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from './Pagination';
import SearchRecipeItem from './SearchRecipeItem';
import { paginationActions } from '../../store/pagination';
import { searchRecipesActions } from '../../store/searchRecipes';
import SortButton from './SortButton';

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.h2`
  margin: 0 !important;
`;

const SearchRecipesList = styled.div`
  display: flex;
  flex-direction: column;
  height: 1000px;
  overflow-y: auto;
`;

const SearchRecipes = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPages = useSelector((state) => state.pagination.totalPages);
  const resultsPerPage = 20;

  const searchedRecipes = useSelector((state) => state.searchRecipes.results);
  // const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [currentRecipes, setCurrentRecipes] = useState([]);

  useEffect(async () => {
    const ingredientsArr = ingredients.map((ingredient) => ingredient.name);
    const response = await axios.post('/recipes/search', { ingredientsArr });
    // setSearchedRecipes(response.data);
    dispatch(searchRecipesActions.set(response.data));
    console.log('searched recipes');
  }, [ingredients]);

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      const total = Math.round(searchedRecipes.length / resultsPerPage);
      dispatch(paginationActions.setTotal(total));
      dispatch(paginationActions.changePage(1));
    }
  }, [searchedRecipes]);

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const slicedArr = searchedRecipes.slice(startIndex, endIndex);
      setCurrentRecipes(slicedArr);
    }
  }, [currentPage, totalPages, searchedRecipes]);

  let content;

  if (searchedRecipes.length > 0 && currentRecipes.length > 0) {
    content = (
      <RecipesContainer>
        <Header>
          <StyledTitle className="title is-3">Available recipes</StyledTitle>
          <SortButton />
        </Header>
        <SearchRecipesList>
          {currentRecipes.map((recipe) => (
            <SearchRecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </SearchRecipesList>
        {totalPages > 1 && <Pagination />}
      </RecipesContainer>
    );
  } else {
    content = null;
  }

  return content;
};

export default SearchRecipes;
