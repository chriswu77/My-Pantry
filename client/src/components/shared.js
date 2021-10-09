import styled from 'styled-components';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Background = styled.section`
  background: url(/images/loginBackground.png) no-repeat center center fixed;
  background-size: cover;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export { ColumnContainer, Background, CenteredDiv };
