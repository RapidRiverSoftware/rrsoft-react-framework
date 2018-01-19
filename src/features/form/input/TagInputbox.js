// @flow
import React from 'react';
import styled from 'styled-components';
import { color } from '../../../../style/config';
import DismissIcon from '../../../components/icon/Dismiss';

type Props = {
  items: Array<{value: string | number, label: string}>,
  input: React.Element<any>,
  onTagClick?: Function,
}

export default ({ items, input, onTagClick }: Props) => (
  <TagGroup>
    {
      items.map((item, i) => (
        <Tag key={`${i}`} onClick={() => onTagClick && onTagClick(item, i)}>
          {item.label}
          <Close>
            <DismissIcon stroke={color.lightNeutral} />
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

const Tag = styled.span`
  position: relative;
  line-height: 30px;
  padding: 0 25px 0 10px;
  white-space: nowrap;
  margin-right: 5px;
  margin-top: 5px;
  background-color: ${color.xxlightNeutral};
  font-weight: 400;
  color: black;
  cursor: pointer;
`;

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
  border-color: ${color.lightNeutral};

  input {
    border: 0;
  }
`;
