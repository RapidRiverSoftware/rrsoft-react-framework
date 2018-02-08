// @flow
import React from 'react';
import styled from 'styled-components';

type alignItemsType =
  // don't autoformat to support react-docgen
  'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';

type Props = {
  push?: 'left' | 'right' | 'both',
  alignItems?: alignItemsType,
  justifyContent?: 'flex-start' | 'flex-end',
};

const StyledComponent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  > *:first-child {
    margin-right: ${({ gap }) => gap || 0}px;
    flex: ${({ push }: Props) => (push === 'left' ? '0 0 auto' : '1 1')};
  }
  > *:last-child {
    flex: ${({ push }: Props) => (push === 'right' ? '0 0 auto' : '1 1')};
  }
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
`;

/**
 * Box that split it's children into half
 */
const Split = (props: Props) => <StyledComponent {...props} />;

export default Split;
