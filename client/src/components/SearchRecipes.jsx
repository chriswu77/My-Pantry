import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from './Pagination';
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

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const resultsPerPage = 20;

  useEffect(async () => {
    const ingredientsArr = ingredients.map((ingredient) => ingredient.name);
    const response = await axios.post('/recipes/search', { ingredientsArr });
    setSearchedRecipes(response.data);
    console.log('searched recipes');
  }, [ingredients]);

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      setTotalPages(Math.round(searchedRecipes.length / resultsPerPage));
      setCurrentPage(1);
    }
  }, [searchedRecipes]);

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const slicedArr = searchedRecipes.slice(startIndex, endIndex);
      setCurrentRecipes(slicedArr);
    }
  }, [currentPage, totalPages]);

  const goToPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  let content;

  if (currentRecipes.length > 0) {
    content = (
      <RecipesContainer>
        <StyledTitle className="title is-3">Available recipes</StyledTitle>
        {currentRecipes.map((recipe) => (
          <SearchRecipeItem key={recipe.id} recipe={recipe} />
        ))}
        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            goToPrev={goToPrev}
            goToNext={goToNext}
            changePage={changePage}
          />
        )}
      </RecipesContainer>
    );
  } else {
    content = null;
  }

  return content;
};

export default SearchRecipes;
