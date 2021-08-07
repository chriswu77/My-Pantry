import React from 'react';
import styled from 'styled-components';
import { Columns } from 'react-bulma-components';

const StyledItem = styled(Columns.Column)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NutritionItem = (props) => {
  const { nutrient } = props;

  const options = [
    'Calories',
    'Carbohydrates',
    'Fat',
    'Protein',
    'Sugar',
    'Cholesterol',
    'Sodium',
    'Fiber',
  ];

  const shortenText = (text) => {
    if (text === 'Calories') {
      return 'Cal';
    }

    if (text === 'Carbohydrates') {
      return 'Carbs';
    }

    return text;
  };

  let item;

  if (options.includes(nutrient.name)) {
    item = (
      <StyledItem>
        <p className="is-size-5 has-text-weight-medium">{`${Math.round(
          nutrient.percentOfDailyNeeds
        )}%`}</p>
        <p className="is-size-4 has-text-weight-semibold">{`${Math.round(
          nutrient.amount
        )}${nutrient.unit === 'kcal' ? '' : nutrient.unit}`}</p>
        <p className="is-size-5 has-text-weight-medium">
          {shortenText(nutrient.name)}
        </p>
      </StyledItem>
    );
  } else {
    item = null;
  }

  return item;
};

export default NutritionItem;
