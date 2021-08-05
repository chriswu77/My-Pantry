import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import PaginationItem from './PaginationItem';

const NavButton = styled(Button)``;

const Pagination = (props) => {
  const { current, total, goToPrev, goToNext, changePage } = props;

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <NavButton
        className="pagination-previous"
        disabled={current === 1}
        onClick={goToPrev}
      >
        Previous
      </NavButton>
      <NavButton
        className="pagination-next"
        disabled={current === total}
        onClick={goToNext}
      >
        Next
      </NavButton>
      <ul className="pagination-list">
        <PaginationItem
          number={1}
          current={current}
          total={total}
          goToPrev={goToPrev}
          goToNext={goToNext}
          changePage={changePage}
        />
        <PaginationItem
          number={2}
          current={current}
          total={total}
          changePage={changePage}
        />
        <PaginationItem
          number={3}
          current={current}
          total={total}
          changePage={changePage}
        />
        <PaginationItem
          number={4}
          current={current}
          total={total}
          changePage={changePage}
        />
        <PaginationItem
          number={5}
          current={current}
          total={total}
          changePage={changePage}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
