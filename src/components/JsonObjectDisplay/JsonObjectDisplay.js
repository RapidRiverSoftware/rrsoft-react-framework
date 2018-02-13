import React from 'react'
import styled from 'styled-components'
import map from 'lodash/map'

const JsonObjectDisplay = ({ info }) => {
  return (
    <KeyValueTable>
      <tbody>
      {
        map(info, (v,k) => (
          <tr key={k}>
            <td className="key">{k}</td>
            <td className="value">{typeof v === 'string' ? v : <JsonObjectDisplay info={v} />}</td>
          </tr>
        ))
      }
      </tbody>
    </KeyValueTable>
  )
}

const KeyValueTable = styled.table`
  td.key {
    background-color: #fafafa;
    text-align: right;
    border-left: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};
  }

  td.value {
    border-right: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};
  }

  table {
    width: auto;
  }
`

export default JsonObjectDisplay
