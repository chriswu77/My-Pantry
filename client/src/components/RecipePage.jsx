/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import {
  Section,
  Container,
  Columns,
  Heading,
  Block,
} from 'react-bulma-components';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import InfoListItem from './InfoListItem';
import NutritionItem from './NutritionItem';

/* STYLED COMPONENTS */
const RecipeImage = styled.img``;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const InfoListLeft = styled(InfoList)`
  border-right: 1px solid grey;
  padding-right: 15px;
  margin-right: 15px;
`;
/* STYLED COMPONENTS END */

const RecipePage = () => {
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [selectRecipe, setSelectRecipe] = useState();

  useEffect(async () => {
    if (recipes.length > 0) {
      const foundRecipe = recipes.find((recipe) => recipe.id === Number(id));

      if (foundRecipe) {
        setSelectRecipe(foundRecipe);
      } else {
        const results = await axios.get(`/api/recipes/${id}`);
        setSelectRecipe(results.data);
      }
    }
  }, [recipes]);

  return (
    <>
      <NavBar />
      {selectRecipe && (
        <Section>
          <Container>
            <Columns>
              <Columns.Column>
                <Columns centered>
                  <Columns.Column size={12}>
                    <Heading className="has-text-centered">
                      {selectRecipe.title}
                    </Heading>
                  </Columns.Column>
                  <Columns.Column
                    className="is-flex is-flex-direction-column is-align-items-center"
                    size={12}
                  >
                    <p>{`Spoonacular score: ${selectRecipe.spoonacularScore}`}</p>
                    <p>{`Likes: ${selectRecipe.aggregateLikes}`}</p>
                  </Columns.Column>
                  <Columns.Column
                    className="is-flex is-justify-content-center"
                    size={12}
                  >
                    <RecipeImage
                      src={selectRecipe.image}
                      alt={selectRecipe.title}
                    />
                  </Columns.Column>
                  <Columns.Column
                    className="is-flex is-justify-content-center"
                    size={12}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: selectRecipe.summary }}
                    />
                  </Columns.Column>
                  <Columns.Column
                    className="is-flex is-justify-content-center"
                    size={12}
                  >
                    <div className="is-flex">
                      <InfoListLeft>
                        <InfoListItem
                          type="Vegetarian"
                          value={selectRecipe.vegetarian}
                        />
                        <InfoListItem type="Vegan" value={selectRecipe.vegan} />
                        <InfoListItem
                          type="Gluten free"
                          value={selectRecipe.glutenFree}
                        />
                        <InfoListItem
                          type="Dairy free"
                          value={selectRecipe.dairyFree}
                        />
                      </InfoListLeft>
                      <InfoList>
                        <InfoListItem
                          type="Very healthy"
                          value={selectRecipe.veryHealthy}
                        />
                        <InfoListItem
                          type="Very popular"
                          value={selectRecipe.veryPopular}
                        />
                        <InfoListItem type="Cheap" value={selectRecipe.cheap} />
                      </InfoList>
                    </div>
                  </Columns.Column>
                  <Columns.Column size={12}>
                    <Columns>
                      {selectRecipe.nutrition.nutrients.map((nutrient) => (
                        <NutritionItem
                          nutrient={nutrient}
                          key={nutrient.name}
                        />
                      ))}
                    </Columns>
                  </Columns.Column>
                  <Columns.Column>Test 1</Columns.Column>
                  <Columns.Column>Test 2</Columns.Column>
                </Columns>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      )}
    </>
  );
};

export default RecipePage;
