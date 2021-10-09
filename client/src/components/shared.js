import styled from 'styled-components';
import { Hero, Form, Button, Box, Notification } from 'react-bulma-components';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled(Notification)`
  width: fit-content;
  padding: 10px;
  margin: 15px 0 0 0 !important;
`;

const Background = styled.section`
  background: url(/images/loginBackground.png) no-repeat center center fixed;
  background-size: cover;
`;

const FormBox = styled(Box)`
  width: 500px;
`;

export { ColumnContainer, Background, CenteredDiv, ErrorMessage, FormBox };
