import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';

const PageButton = styled(Button)``;

const PaginationItem = (props) => {
  const { number, current, total, changePage } = props;

  let listItem;

  if (number <= total) {
    listItem = (
      <li>
        <PageButton
          className={`pagination-link ${
            current === number ? 'is-current' : ''
          }`}
          onClick={() => changePage(number)}
        >
          {number}
        </PageButton>
      </li>
    );
  } else {
    listItem = null;
  }

  return listItem;
};

export default PaginationItem;
