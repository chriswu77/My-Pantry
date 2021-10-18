import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import IngredientsListItem from './IngredientsListItem';
import { ColumnContainer } from './shared';

const StyledTitle = styled.h2`
  margin: 0 !important;
`;

const IngredientsList = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  return (
    <ColumnContainer>
      <StyledTitle className="title is-3">My ingredients</StyledTitle>
      <ColumnContainer>
        {ingredients.map((ingredient) => (
          <IngredientsListItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </ColumnContainer>
    </ColumnContainer>
  );
};

export default IngredientsList;
