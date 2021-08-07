import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.value ? 'green' : 'red')};
`;

const InfoListItem = (props) => {
  const { type, value } = props;

  return (
    <StyledItem>
      <StyledIcon value={value} icon={value ? faCheck : faTimes} />
      <p className="ml-3">{type}</p>
    </StyledItem>
  );
};

export default InfoListItem;
