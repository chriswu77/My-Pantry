import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItem from './PaginationItem';
import { paginationActions } from '../../store/pagination';

const NavButton = styled(Button)``;

const Pagination = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.pagination.currentPage);
  const total = useSelector((state) => state.pagination.totalPages);

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <NavButton
        className="pagination-previous"
        disabled={current === 1}
        onClick={() => dispatch(paginationActions.goToPrev())}
      >
        Previous
      </NavButton>
      <NavButton
        className="pagination-next"
        disabled={current === total}
        onClick={() => dispatch(paginationActions.goToNext())}
      >
        Next
      </NavButton>
      <ul className="pagination-list">
        <PaginationItem number={1} />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />
      </ul>
    </nav>
  );
};

export default Pagination;
