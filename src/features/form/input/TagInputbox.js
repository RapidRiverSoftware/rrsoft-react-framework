// @flow
import React from 'react';
import styled, { withTheme } from 'styled-components';
import DismissIcon from '../../../components/Icon/Dismiss';

type Props = {
  items: Array<{value: string | number, label: string}|string>,
  input: React.Element<any>,
  onTagClick?: Function,
}

export default ({ items, input, onTagClick }: Props) => (
  <TagGroup>
    {
      items.map((item, i) => (
        <Tag key={`${i}`} onClick={() => onTagClick && onTagClick(item, i)}>
          {typeof item === 'string' ? item : item.label}
          <Close>
            <DismissIcon stroke="#000" />
          </Close>
        </Tag>))
    }
    <Input>{input}</Input>
  </TagGroup>
);

const Close = styled.span`
  position: absolute;
  right: 8px;
  top: 0;
`;

const Tag = withTheme(styled.span`
  position: relative;
  line-height: 30px;
  padding: 0 25px 0 10px;
  white-space: nowrap;
  margin-right: 5px;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.primaryTagBgColor(5)};
  font-weight: 400;
  color: black;
  cursor: pointer;
`);

const Input = styled.div`
  margin-top: 16px;
  margin-left: -5px;
  flex-grow: 1000;
  min-width: 200px;
`;

const TagGroup = styled.div`
  margin-top: -5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  border-width: 0 0 1px 0;
  border-style: dashed;
  input {
    border: 0;
  }
`;
