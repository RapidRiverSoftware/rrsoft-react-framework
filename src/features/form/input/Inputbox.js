import styled from 'styled-components';
// import { weight, color, gap, font } from '../../../../style/config';

export default styled.input`
  box-sizing: border-box;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: dashed;
  ${'' /* border-color: ${color.lightNeutral};
  padding: 0 ${gap.small}px;
  font-size: ${font.large};
  font-weight: ${weight.normal}; */}
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
`;
