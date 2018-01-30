import React from 'react'
import styled, { withTheme } from 'styled-components';

const DisplayOnlyBox = ({ value }) => <Display>{value}</Display>

const Display = withTheme(styled.div`
  box-sizing: border-box;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${({ theme }) => 'transparent'};
  padding: 0 ${({ theme }) => theme.gap(3)};
  font-size: ${({ theme }) => theme.fontSize(5)};
  font-weight: ${({ theme }) => theme.fontWeight(5)};
  width: 100%;
  color: #656565;
  line-height: 19px;
  background-color: transparent;

  ${({ disabled }) => (disabled && `
   outline: 0;
   border: 0px;
 `)}

  ${({ isActive }) => (isActive && `
    outline: 0;
  `)}

  &:focus {
    outline: 0;
  }
`);

export default DisplayOnlyBox
