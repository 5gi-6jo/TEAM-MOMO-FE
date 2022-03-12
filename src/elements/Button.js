import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, name }) => {
  return <StyledButton onClick={onClick}>{name}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: black;
  color: white;
  padding: 0.5em 1em;
  border-radius: 8px;
  margin-top: 2em;
`;

export default Button;
