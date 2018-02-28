import React from 'react';
import styled from 'styled-components';


type Props = {|
  options: Array<{label: string, value: string}>,
  placeholder?: string,
|}

export default (props: Props) => (
  <Select {...props}>
    { props.placeholder && (<option value="">{props.placeholder}</option>) }
    {
      props.options ?
        props
          .options
          .map((option, index) => (
            <option key={`o${index}`} value={option.value}>
              {option.label}
            </option>
          ))
        :
        null
    }
  </Select>
);

const Select = styled.select`
  appearance: none;
  box-sizing: border-box;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: dashed;
  width: 100%;
  color: black;
  line-height: 19px;


  &::-ms-expand {
    display: none;
  }

  ${({ isActive }) => (isActive && `
    outline: 0;
  `)}
`;
