// @flow
import React from 'react';
import styled, { withTheme } from 'styled-components';
import DismissIcon from '../../../components/Icon/Dismiss';

type Props = {
  items: Array<{value: string | number, label: string}|string>,
  input: React.Element<any>,
  onTagClick?: Function,
  disabled?: Boolean,
}

export default ({ disabled=false, items, input, onTagClick }: Props) => {
  console.log('i',items)
  return (
    <TagGroup>
      {
        items ? items.map((item, i) => (
          <Tag disabled={disabled} key={`${i}`} onClick={() => !disabled && onTagClick && onTagClick(item, i)}>
            {typeof item === 'string' ? item : item.label}
            {disabled ? null : <Close>
              <DismissIcon stroke="#fefefe" />
            </Close>}
          </Tag>)) : null
      }
      <Input>{input}</Input>
    </TagGroup>
  )
};

const Close = styled.span`
  position: absolute;
  right: 8px;
  top: 0;
`;

const Tag = withTheme(styled.span`
  position: relative;
  line-height: 25px;
  padding: 0 ${({ disabled }) => disabled ? '10px' : '25px'} 0 10px;
  white-space: nowrap;
  margin-right: 5px;
  margin-top: 5px;
  background-color: ${({ disabled, theme }) => disabled ? theme.primaryTagDisabledBgColor(5) : theme.primaryTagBgColor(5)};
  color: ${({ disabled, theme }) => disabled ? theme.primaryTagDisabledTextColor(5) : theme.primaryTagTextColor(5)};
  font-weight: 400;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`);

const Input = styled.div`
  margin-top: 15px;
  flex-grow: 1000;
  min-width: 200px;
  > input {
    height: 25px;
  }
`;

const TagGroup = styled.div`
  margin-top: -5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  border-width: 0 0 1px 0;
  border-color: ${({ theme }) => theme.primaryBorderColor(5)};
  border-style: solid;
  input {
    border: 0;
  }
`;
