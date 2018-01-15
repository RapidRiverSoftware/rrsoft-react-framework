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
  border: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};

  tbody tr:first-child td {
    border-top: 0;
  }

  td.key {
    background-color: #f7f7f7;
    text-align: right;
  }

  td.value {
  }

  table {
    width: auto;
  }
`

export default JsonObjectDisplay
