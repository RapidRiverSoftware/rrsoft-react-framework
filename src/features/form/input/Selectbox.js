import React from 'react';
import styled from 'styled-components';

const caretImage = require('../../../assets/images/caret.svg');

type Props = {|
  options: Array<{label: string, value: string}>,
  placeholder?: string,
|}
export default (props: Props) => (<Select {...props}>
  { props.placeholder && (<option value="">{props.placeholder}</option>) }
  {
    props
      .options
      .map((option, index) => (
        <option key={`o${index}`} value={option.value}>
          {option.label}
        </option>
      ))
  }
</Select>);

const Select = styled.select`
  appearance: none;
  background: transparent url(${caretImage}) no-repeat center right 3px;
  box-sizing: border-box;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: dashed;
  border-color: #fafafa;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 300;
  width: 100%;
  color: black;
  line-height: 19px;

  options[value=""] {
    color: #fafafa
  }

  &::-ms-expand {
    display: none;
  }

  ${({ isActive }) => (isActive && `
    outline: 0;
    border-color: #123456;
  `)}
`;
