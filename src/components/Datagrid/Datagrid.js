// @flow
/* globals React$Element */
import React from 'react';
import map from 'lodash/map';
import omit from 'lodash/omit';
import jsonEqualMemoize from '../../util/fn/jsonEqualMemoize';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import { Table, HeaderRow, BodyRow } from '../Table';

type StandardField = {
  fieldName: string,
  handleClick?: () => void,
  sortable?: boolean,
  identifier?: string,
  label?: string | React$Element<any>,
  width?: string | number,
  align?: 'left' | 'right' | 'center',
};

type CustomRender = {
  render: (row: Object, actions?: Object) => any,
  handleClick?: () => void,
  sortable?: boolean,
  identifier?: string,
  label?: string | React$Element<any>,
  width?: string | number,
  align?: 'left' | 'right' | 'center',
};

type ColumnShape = StandardField | CustomRender;

type Props = {
  columns: Array<ColumnShape>,
  data: Array<Object>,
  orderBy?: Object,
  actions?: Object,
  rowId?: (row: Object) => any,
  HeadRenderer?: any,
  HeadRendererProps?: any,
  BodyRenderer?: any,
  BodyRendererProps?: any,
  tableOptions?: {
    tableLayout?: 'fixed' | 'auto',
    tableMinWidth?: number | string,
    headerBgColor?: string,
    headerTextColor?: string,
    headerFontSize?: string | number,
    headerFontWeight?: string | number,
    headerLetterSpacing?: string | number,
    headerBorder?: string | number | Object,
    rowBgColor?: string,
    rowBorder?: string | number | Object,
    rowPadding?: string | number | Object,
    rowHeight?: string | number,
  },
};

const colStyles = col => omit(col, ['fieldName', 'label', 'render']);

const columnHeaders = (columns, orderBy = {}, sharedCellStyles) => () =>
  columns.map((col, j) => (<HeaderCell
    key={j}
    sortable={col.sortable}
    direction={col.identifier ? orderBy[col.identifier] : null}
    label={col.label}
    handleClick={col.handleClick}
    cellStyles={{
      ...sharedCellStyles,
      ...colStyles(col),
    }}
  />));

const columnData = (row, actions, columns, sharedCellStyles) => hover =>
  columns.map((col, j) => (<Cell
    key={j}
    row={row}
    column={col}
    actions={actions}
    options={{ rowHovered: hover }}
    cellStyles={{
      ...sharedCellStyles,
      ...colStyles(col),
    }}
  />));

const DefaultHeadRenderer = ({ renderColumnHeaders, rowStyles }) => (
  <HeaderRow {...rowStyles}>
    {renderColumnHeaders()}
  </HeaderRow>
);

class DefaultBodyRenderer extends React.Component {
  props: Object;
  state: { hover: boolean };

  constructor(props: Object) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    const { rowStyles, renderColumnData } = this.props;
    return (
      <BodyRow
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        {...rowStyles}
      >
        {renderColumnData(this.state.hover)}
      </BodyRow>
    );
  }
}

const Datagrid = ({
  columns, data, actions, tableOptions = {},
  orderBy,
  HeadRenderer = DefaultHeadRenderer,
  HeadRendererProps = {},
  BodyRenderer = DefaultBodyRenderer,
  BodyRendererProps = {},
}: Props) => {
  const styleOptions = tableOptionsToStyleOptions(tableOptions);

  return (<Table {...styleOptions.table}>
    <thead>
      <HeadRenderer
        rowStyles={styleOptions.headerRow}
        renderColumnHeaders={columnHeaders(columns, orderBy, styleOptions.headerCell)}
        columns={columns}
        data={data}
        {...HeadRendererProps}
      />
    </thead>
    <tbody>
      {map(data, (row, i) =>
        (<BodyRenderer
          key={i}
          rowStyles={styleOptions.bodyRow}
          renderColumnData={columnData(row, actions, columns, styleOptions.bodyCell)}
          row={row}
          columns={columns}
          data={data}
          actions={actions}
          {...BodyRendererProps}
        />),
      )}
    </tbody>
  </Table>);
};

const tableOptionsToStyleOptions = jsonEqualMemoize((tableOptions: Object) => ({
  table: {
    tableLayout: tableOptions.tableLayout,
    minWidth: tableOptions.minWidth,
  },
  headerRow: {
    backgroundColor: tableOptions.headerBgColor,
    color: tableOptions.headerTextColor,
    fontSize: tableOptions.headerFontSize,
    weight: tableOptions.headerFontWeight,
    letterSpacing: tableOptions.headerLetterSpacing,
    border: tableOptions.headerBorder,
  },
  headerCell: {
  },
  bodyRow: {
    backgroundColor: tableOptions.rowBgColor,
    border: tableOptions.rowBorder,
  },
  bodyCell: {
    pad: tableOptions.rowPadding,
    height: tableOptions.rowHeight,
  },
}));

export default Datagrid;
