// @flow

import headerRenderer from './headerRenderer'

const Datagrid = ({ columns, data }) => {
  return (
    <table border="1">
      { headerRenderer(columns) }
      { bodyRenderer(columns, data) }
    </table>
  )
}
