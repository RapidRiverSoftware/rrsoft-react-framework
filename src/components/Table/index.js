import styled from 'styled-components';
// import {
//   weightProps,
//   widthHeightProps,
//   borderProps,
//   colorProps,
//   backgroundColorProps,
//   padProps,
//   fontSizeProps,
//   alignProps,
//   numberToPx,
//   valignProps,
// } from '../../../style/shorthands';

const HeaderCell = styled.th`
  ${'' /* ${alignProps('left')};
  ${colorProps()};
  ${backgroundColorProps()};
  ${borderProps()};
  ${fontSizeProps()};
  ${padProps({ leftRight: 10, top: 26, bottom: 10 })};
  ${weightProps('bold')};
  ${valignProps('bottom')};
  letter-spacing: ${({ letterSpacing }) => (
    letterSpacing !== undefined ? numberToPx(letterSpacing) : '1px'
  )};
  white-space: nowrap;
  ${props => props.handleClick && 'cursor: pointer'}; */}
`;

const BodyCell = styled.td`
  ${'' /* ${alignProps('left')};
  ${colorProps()};
  ${backgroundColorProps()};
  ${borderProps()};
  ${fontSizeProps()};
  ${padProps({ topBottom: 20, leftRight: 10 })};
  ${weightProps()};
  ${widthHeightProps()};
  ${valignProps('middle')}; */}
`;

const HeaderRow = styled.tr`
  ${'' /* ${backgroundColorProps('xxxxlightNeutral')};
  ${borderProps({ bottom: 1, color: 'xxlightNeutral' })};
  ${colorProps('neutral')};
  ${fontSizeProps('xsmall')}; */}
  text-transform: uppercase;
`;

const BodyRow = styled.tr`
  ${'' /* ${backgroundColorProps('xxxlighterNeutral')};
  ${borderProps({ bottom: 1, color: 'xxlightNeutral' })};
  ${colorProps('primary')}; */}
`;

const Table = styled.table`
  ${({ tableLayout }) => (tableLayout && `table-layout: ${tableLayout};`)}
  ${'' /* ${({ minWidth }) => (minWidth && `min-width: ${numberToPx(minWidth)};`)} */}
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;

export {
  Table,
  HeaderRow,
  HeaderCell,
  BodyRow,
  BodyCell,
};
