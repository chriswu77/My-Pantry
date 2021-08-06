import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from 'react-bulma-components';
import { ingredientsActions } from '../../store/ingredients';

const IngredientItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 2.5px 0 !important;

  &:first-child {
    margin-top: 5px;
  }

  &:last-child {
    margin-bottom: 5px;
  }
`;

const IngredientPic = styled.img`
  height: 40px;
  width: 40px;
`;

const IngredientName = styled.p`
  margin-left: 10px;
`;

const DeleteButton = styled.button`
  margin-left: auto;
`;

const IngredientsListItem = (props) => {
  const { ingredient } = props;

  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const onClick = async () => {
    await axios.delete(`/api/users/${userId}/ingredients/${ingredient._id}`);
    const updatedIngredients = await axios.get(
      `/api/users/${userId}/ingredients`
    );
    dispatch(ingredientsActions.set(updatedIngredients.data));
  };

  return (
    <IngredientItem>
      <IngredientPic
        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
        alt={ingredient.name}
      />
      <IngredientName>{ingredient.name}</IngredientName>
      <DeleteButton className="delete is-small" onClick={onClick} />
    </IngredientItem>
  );
};

export default IngredientsListItem;
