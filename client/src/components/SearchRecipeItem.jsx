import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import editFavorite from '../helperFunctions';
import { recipesActions } from '../../store/recipes';

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

const FavoriteButton = styled(Button)``;

const SearchRecipeItem = (props) => {
  const { recipe } = props;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const recipes = useSelector((state) => state.recipes.recipes);

  const [isFavorite, setIsFavorite] = useState(false);

  const missedIngredients = recipe.missedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');
  const usedIngredients = recipe.usedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');
  const unusedIngredients = recipe.unusedIngredients
    .map((ingredient) => ingredient.name)
    .join(', ');

  useEffect(() => {
    const index = recipes.findIndex((cur) => cur.id === recipe.id);
    if (index === -1) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }, [recipe]);

  const onClick = async () => {
    if (isFavorite) {
      const savedRecipe = recipes.find((cur) => cur.id === recipe.id);
      const newRecipeData = await editFavorite(
        savedRecipe._id,
        userId,
        'remove'
      );
      dispatch(recipesActions.set(newRecipeData));
      setIsFavorite(false);
    } else {
      const newRecipeData = await editFavorite(recipe.id, userId, 'add');
      dispatch(recipesActions.set(newRecipeData));
      setIsFavorite(true);
    }
  };

  return (
    <RecipeCard>
      <RecipePic src={recipe.image} alt={recipe.title} />
      <RecipeInfo>
        <RecipeName className="title is-6">{recipe.title}</RecipeName>
        <IngredientsInfo>
          <RecipeText>
            Used ingredients {`(${recipe.usedIngredientCount})`}:{' '}
            {usedIngredients}
          </RecipeText>
          <RecipeText>
            Missed ingredients {`(${recipe.missedIngredientCount})`}:{' '}
            {missedIngredients}
          </RecipeText>
          <RecipeText>
            Unused ingredients {`(${recipe.unusedIngredients.length})`}:{' '}
            {unusedIngredients}
          </RecipeText>
        </IngredientsInfo>
        <Footer>
          <RecipeText>Likes: {recipe.likes}</RecipeText>
          <FavoriteButton
            color={isFavorite ? 'danger' : 'success'}
            onClick={onClick}
          >
            {isFavorite ? 'Remove from' : 'Add to'} favorites
          </FavoriteButton>
        </Footer>
      </RecipeInfo>
    </RecipeCard>
  );
};

export default SearchRecipeItem;
