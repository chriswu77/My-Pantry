import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Dropdown } from 'react-bulma-components';
import { searchRecipesActions } from '../../store/searchRecipes';

const SortButton = (props) => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.searchRecipes.sortBy);
  const searchedRecipes = useSelector((state) => state.searchRecipes.results);

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      const copyArr = [...searchedRecipes];
      let sortedArr;

      if (sortBy === 'used') {
        sortedArr = copyArr.sort(
          (recipe1, recipe2) =>
            recipe2.usedIngredientCount - recipe1.usedIngredientCount
        );
      } else {
        sortedArr = copyArr.sort(
          (recipe1, recipe2) => recipe2.likes - recipe1.likes
        );
      }

      dispatch(searchRecipesActions.set(sortedArr));
    }
  }, [sortBy]);

  const onChange = (selected) => {
    if (sortBy !== selected) {
      dispatch(searchRecipesActions.sort(selected));
    }
  };

  return (
    <Dropdown
      value={sortBy}
      label={`Sort by: ${sortBy === 'used' ? 'Used Ingredients' : 'Likes'}`}
      color="info"
      onChange={onChange}
    >
      <Dropdown.Item value="used">Used ingredients</Dropdown.Item>
      <Dropdown.Item value="likes">Likes</Dropdown.Item>
    </Dropdown>
  );
};

export default SortButton;
