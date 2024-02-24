import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 600px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.5;
  padding: 8px 12px;
  padding-left: 0px;
  border-radius: 8px;
  outline: none;
  border: 0px;

  &:hover {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

export default Input