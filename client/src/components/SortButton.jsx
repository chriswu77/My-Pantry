import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import { searchRecipesActions } from '../../store/searchRecipes';

const options = [
  { value: 'used', label: 'Used ingredients' },
  { value: 'likes', label: 'Likes' },
];

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

const customStyles = {
  valueContainer: (provided) => ({
    ...provided,
    width: 145,
  }),
};

const SortButton = () => {
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

  const onChange = (option) => {
    if (sortBy !== option.value) {
      dispatch(searchRecipesActions.sort(option.value));
    }
  };

  return (
    <ButtonDiv>
      <label>Sort by</label>
      <Select
        id="sort-button"
        value={sortBy === 'used' ? options[0] : options[1]}
        options={options}
        onChange={onChange}
        isSearchable={false}
        styles={customStyles}
      />
    </ButtonDiv>
  );
};

export default SortButton;
