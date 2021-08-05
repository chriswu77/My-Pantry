import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions } from '../../store/pagination';

const PageButton = styled(Button)``;

const PaginationItem = (props) => {
  const { number } = props;

  const dispatch = useDispatch();
  const current = useSelector((state) => state.pagination.currentPage);
  const total = useSelector((state) => state.pagination.totalPages);

  let listItem;

  if (number <= total) {
    listItem = (
      <li>
        <PageButton
          className={`pagination-link ${
            current === number ? 'is-current' : ''
          }`}
          onClick={() => dispatch(paginationActions.changePage(number))}
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
