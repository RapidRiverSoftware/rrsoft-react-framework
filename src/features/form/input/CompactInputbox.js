import styled, { withTheme } from 'styled-components';
// import { weight, color, gap, font } from '../../../../style/config';

export default withTheme(styled.input`
  box-sizing: border-box;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${({ theme }) => theme.primaryBorderColor(5)};
  padding: 0 ${({ theme }) => theme.gap(3)};
  font-size: ${({ theme }) => theme.fontSize(5)};
  height: 20px;
  font-weight: ${({ theme }) => theme.fontWeight(5)};
  width: 100%;
  color: black;
  line-height: 19px;
  background-color: transparent;

  &::placeholder {
    ${'' /* color: ${color.lightNeutral}; */}
  }

  ${({ disabled }) => (disabled && `
     outline: 0;
     border: 0px;
   `)}

  ${({ isActive }) => (isActive && `
    outline: 0;
  `)}
    ${'' /* border-color: ${color.secondary}; */}

  &:focus {
    outline: 0;
    ${'' /* border-color: ${color.secondary}; */}
  }
`);
