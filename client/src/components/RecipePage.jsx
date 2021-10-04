/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { Section, Container, Columns, Heading } from 'react-bulma-components';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import InfoListItem from './InfoListItem';
import NutritionItem from './NutritionItem';
import { ColumnContainer } from './shared';

/* STYLED COMPONENTS */
const DetailItem = styled.p`
  padding: 1px 0;
`;

const IngredientsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: inside;
  width: fit-content;
`;

const IngredientListItem = styled.li`
  width: fit-content;
  font-size: 18px;
`;
/* STYLED COMPONENTS END */

const RecipePage = () => {
  const { id } = useParams();
  const [selectRecipe, setSelectRecipe] = useState();

  useEffect(async () => {
    const results = await axios.get(`/api/recipes/${id}`);
    setSelectRecipe(results.data);
  }, []);

  if (!selectRecipe) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Section>
        <Container>
          <Columns>
            <Columns.Column>
              <Columns breakpoint="mobile" centered>
                <Columns.Column narrow>
                  <img src={selectRecipe.image} alt={selectRecipe.title} />
                </Columns.Column>
                <Columns.Column
                  className="is-flex is-flex-direction-column is-justify-content-space-between"
                  narrow
                >
                  <Heading className="mb-0">{selectRecipe.title}</Heading>
                  <ColumnContainer>
                    <DetailItem>{`Servings: ${selectRecipe.servings}`}</DetailItem>
                    <DetailItem>{`Cook time: ${selectRecipe.readyInMinutes} minutes`}</DetailItem>
                  </ColumnContainer>
                  <ColumnContainer>
                    <DetailItem>{`Spoonacular score: ${selectRecipe.spoonacularScore}`}</DetailItem>
                    <DetailItem>{`Likes: ${selectRecipe.aggregateLikes}`}</DetailItem>
                  </ColumnContainer>
                  <ColumnContainer>
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
                  </ColumnContainer>
                </Columns.Column>
              </Columns>
            </Columns.Column>

            <Columns.Column size={12}>
              <Columns>
                {selectRecipe.nutrition.nutrients.map((nutrient) => (
                  <NutritionItem nutrient={nutrient} key={nutrient.name} />
                ))}
              </Columns>
            </Columns.Column>

            <Columns.Column className="is-flex is-flex-direction-column">
              <Heading renderAs="h2" size="4" className="mb-2">
                Ingredients
              </Heading>
              <IngredientsList>
                {selectRecipe.extendedIngredients.map((ingred) => (
                  <IngredientListItem key={ingred.original}>
                    {ingred.originalString}
                  </IngredientListItem>
                ))}
              </IngredientsList>
            </Columns.Column>

            {selectRecipe.instructions && (
              <Columns.Column
                className="is-flex is-flex-direction-column"
                size={12}
              >
                <Heading renderAs="h2" size="4" className="mb-2">
                  Instructions
                </Heading>
                <p
                  style={{ fontSize: 18 }}
                  dangerouslySetInnerHTML={{
                    __html: selectRecipe.instructions.replace(
                      '<ol>',
                      '<ol style="list-style-position:inside">'
                    ),
                  }}
                />
              </Columns.Column>
            )}

            <Columns.Column>
              <p>
                Read the detailed instructions on{' '}
                <a
                  href={selectRecipe.sourceUrl}
                  alt={selectRecipe.creditsText}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectRecipe.creditsText}
                </a>
              </p>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </>
  );
};

export default RecipePage;
