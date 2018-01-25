import React from 'react';
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
`
export default ({ message }) => <ErrorMessage>{message}</ErrorMessage>
