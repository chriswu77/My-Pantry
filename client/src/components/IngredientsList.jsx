import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import IngredientsListItem from './IngredientsListItem';

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  margin: 0 !important;
`;

const IngredientsList = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  return (
    <IngredientsContainer>
      <StyledTitle className="title is-3">My ingredients</StyledTitle>
      <IngredientsContainer>
        {ingredients.map((ingredient) => (
          <IngredientsListItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </IngredientsContainer>
    </IngredientsContainer>
  );
};

export default IngredientsList;
