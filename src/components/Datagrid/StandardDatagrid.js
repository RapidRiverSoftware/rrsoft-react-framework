// @flow
/* globals React$Element */
import React from 'react';
import jsonEqualMemoize from '../../util/fn/jsonEqualMemoize';

import Datagrid from '../Datagrid';
import GlobalCheckboxCell from './GlobalCheckboxCell';
import CheckboxCell from './CheckboxCell';
import { HeaderRow, BodyRow, BodyCell, HeaderCell } from '../Table';

const DefaultLabelHeaderRenderer = () => <HeaderCell pad={0} width={5} />;

const DefaultCheckboxHeaderRenderer = ({ data, checkedRows, onCheckChange }) => (
  <GlobalCheckboxCell allRows={data} checkedRows={checkedRows} onCheckChange={onCheckChange} />
);

const DefaultLabelRenderer = ({ calculateLabelColor, row }) => (
  <BodyCell backgroundColor={calculateLabelColor(row)} pad={0} width={5} />
);

const DefaultCheckboxRenderer = ({ row, checkedRows, onCheckChange }) => (
  <CheckboxCell row={row} checkedRows={checkedRows} onCheckChange={onCheckChange} />
);

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
  actions?: Object,
  orderBy?: Object,
  queryBy?: string,

  headerType?: 'default' | 'transparent' | 'transparentOnDark' | 'noshow' | 'white',
  bodyType?: 'default' | 'darker' | 'compactWhite',
  enableCheckbox?: boolean,
  enableColorLabel?: boolean,

  checkedRows?: Array<Object>,
  onCheckChange?: (checkedRows: Array<Object>) => any,
  calculateLabelColor?: Function,
  LabelHeaderRenderer?: any,
  LabelRenderer?: any,
  CheckboxHeaderRenderer?: any,
  CheckboxRenderer?: any,
  tableOptions?: any,
};

const makeHeadRenderer = jsonEqualMemoize(({
  headerType,
  enableColorLabel,
  LabelHeaderRenderer,
  enableCheckbox,
  CheckboxHeaderRenderer,
}) => {
  if (headerType === 'noshow') {
    return () => null;
  }
  return ({ renderColumnHeaders, rowStyles, data, checkedRows, onCheckChange }) => (
    <HeaderRow {...rowStyles}>
      { enableColorLabel && <LabelHeaderRenderer /> }
      {
        enableCheckbox && <CheckboxHeaderRenderer
          data={data}
          checkedRows={checkedRows}
          onCheckChange={onCheckChange}
        />
      }
      {renderColumnHeaders()}
    </HeaderRow>
  );
});

const makeBodyRenderer = jsonEqualMemoize(({
  enableColorLabel,
  LabelRenderer,
  enableCheckbox,
  CheckboxRenderer,
  calculateLabelColor,
}) => {
  class BodyRenderer extends React.Component {
    props: Object;
    state: { hover: boolean };

    constructor(props: Object) {
      super(props);
      this.state = { hover: false };
    }

    render() {
      const { renderColumnData, row, rowStyles, checkedRows, onCheckChange } = this.props;
      return (
        <BodyRow
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          {...rowStyles}
        >
          {
            enableColorLabel && <LabelRenderer
              calculateLabelColor={calculateLabelColor}
              row={row}
            />
          }
          {
            enableCheckbox && <CheckboxRenderer
              row={row}
              checkedRows={checkedRows}
              onCheckChange={onCheckChange}
            />
          }
          {renderColumnData(this.state.hover)}
        </BodyRow>
      );
    }
  }

  return BodyRenderer;
});

const StandardDatagrid = ({
  columns,
  data,
  actions,
  orderBy,
  queryBy,

  headerType = 'default',
  bodyType = 'default',
  enableCheckbox,
  enableColorLabel,
  tableOptions,

  checkedRows,
  onCheckChange,
  calculateLabelColor,
  LabelHeaderRenderer = DefaultLabelHeaderRenderer,
  LabelRenderer = DefaultLabelRenderer,
  CheckboxHeaderRenderer = DefaultCheckboxHeaderRenderer,
  CheckboxRenderer = DefaultCheckboxRenderer,
}: Props) => {
  const HeadRenderer = makeHeadRenderer({
    headerType,
    enableColorLabel,
    LabelHeaderRenderer,
    enableCheckbox,
    CheckboxHeaderRenderer,
  });

  const BodyRenderer = makeBodyRenderer({
    enableColorLabel,
    LabelRenderer,
    enableCheckbox,
    CheckboxRenderer,
    calculateLabelColor,
  });

  const rendererProps = {
    checkedRows,
    onCheckChange,
  };

  return (
    <Datagrid
      columns={columns}
      data={data}
      actions={actions}
      orderBy={orderBy}
      queryBy={queryBy}
      HeadRenderer={HeadRenderer}
      HeadRendererProps={rendererProps}
      BodyRenderer={BodyRenderer}
      BodyRendererProps={rendererProps}
      tableOptions={{
        ...tableOptions,
        ...headerTypeStyle[headerType],
        ...bodyTypeStyle[bodyType],
      }}
    />
  );
};

const headerTypeStyle = {
  default: {
    headerBgColor: 'xxxxlightNeutral',
  },
  transparent: {
    headerBgColor: 'transparent',
  },
  transparentOnDark: {
    headerBgColor: 'transparent',
    headerTextColor: 'white',
  },
  white: {
    headerBgColor: 'white',
  },
  noshow: {},
};

const bodyTypeStyle = {
  default: {},
  darker: {
    rowBgColor: 'xxxlightNeutral',
  },
  compactWhite: {
    rowBgColor: 'white',
    rowPadding: 10,
    rowBorder: 0,
  },
};

StandardDatagrid.defaultProps = {
  enableCheckbox: false,
  enableColorLabel: false,
};

export default StandardDatagrid;
