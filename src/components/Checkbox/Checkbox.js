import React from 'react';
import styled from 'styled-components';

export default ({ checked, partiallyChecked, onChange }) => (
  <Checkbox
    type="checkbox"
    checked={!!checked}
    partiallyChecked={!!partiallyChecked}
    onChange={event => onChange(event.target.checked)}
  />
);

const Checkbox = styled.input`
  appearance: none;
  margin: 0;
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: ${({ checked, partiallyChecked }) => {
    if (checked || partiallyChecked) {
      // return color.secondary;
    }
    return 'transparent';
  }};

  &:focus {
    outline: none;
  }

  &:after {
    content: ${({ checked, partiallyChecked }) => {
      if (partiallyChecked) {
        return `url(${require('../../assets/images/checkbox_partial.svg')})`;
      } else if (checked) {
        return `url(${require('../../assets/images/checkbox_checked.svg')})`;
      }
      return `url(${require('../../assets/images/checkbox.svg')})`;
    }};
    position: relative;
  }
`;
