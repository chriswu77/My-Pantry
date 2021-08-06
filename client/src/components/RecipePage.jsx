import React, { useState, useEffect } from 'react';
import { Section, Container, Columns, Heading } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const RecipePage = (props) => {
  console.log('recipe page');
  // const { recipeId } = props;

  const { id } = useParams();

  const recipes = useSelector((state) => state.recipes.recipes);

  const [selectRecipe, setSelectRecipe] = useState();

  useEffect(async () => {
    // check if this recipe is already in our saved from recipes state
    const foundRecipe = recipes.find((recipe) => recipe.id === id);

    if (foundRecipe) {
      setSelectRecipe(foundRecipe);
    } else {
      // if it isnt then do a get request to the server and grab the info
      const results = await axios.get(`/recipes/${id}`);
      setSelectRecipe(results.data);
    }
  }, []);

  return (
    <>
      {selectRecipe && (
        <Section>
          <Container>
            <Columns>
              <Columns.Column>
                <Heading>{selectRecipe.title}</Heading>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      )}
    </>
  );
};

export default RecipePage;
