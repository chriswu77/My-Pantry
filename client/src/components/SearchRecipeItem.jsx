import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';

const RecipeCard = styled.div`
  display: flex;
`;

const RecipePic = styled.img``;

const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const RecipeName = styled.h3`
  margin: 0 !important;
`;

const IngredientsInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeText = styled.p``;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled(Button)`

`;

const SearchRecipeItem = (props) => {
  const { recipe } = props;

  const missedIngredients = recipe.missedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');
  const usedIngredients = recipe.usedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');
  const unusedIngredients = recipe.unusedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');

  const onClick = () => {

  };

  return (
    <RecipeCard>
      <RecipePic src={recipe.image} alt={recipe.title} />
      <RecipeInfo>
        <RecipeName className="title is-6">{recipe.title}</RecipeName>
        <IngredientsInfo>
          <RecipeText>
            Missed ingredients {`(${recipe.missedIngredientCount})`}:{' '}
            {missedIngredients}
          </RecipeText>
          <RecipeText>
            Used ingredients {`(${recipe.usedIngredientCount})`}:{' '}
            {usedIngredients}
          </RecipeText>
          <RecipeText>
            Unused ingredients {`(${recipe.unusedIngredients.length})`}:{' '}
            {unusedIngredients}
          </RecipeText>
        </IngredientsInfo>
        <Footer>
          <RecipeText>Likes: {recipe.likes}</RecipeText>
          <AddButton color="success">Add to favorites</AddButton>
        </Footer>
      </RecipeInfo>
    </RecipeCard>
  );
};

export default SearchRecipeItem;
