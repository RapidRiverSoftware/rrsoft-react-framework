import React from 'react';
import styled from 'styled-components';
import Inputbox from './Inputbox';
import { gap } from '../../../../style/config';

type Props = {
  icon: React.Element<any>,
  onClick?: Function,
};
export default ({ onClick, icon, ...props }: Props) => (
  <RelativeBox onClick={onClick}>
    <Inputbox {...props} />
    <RightIcon>{icon}</RightIcon>
  </RelativeBox>
);

const RelativeBox = styled.div`
  position: relative;
  cursor: pointer;
`;

const RightIcon = styled.div`
  position: absolute;
  right: ${gap.xsmall}px;
  bottom: 3px;
  > * {
    display: block;
  }
`;
