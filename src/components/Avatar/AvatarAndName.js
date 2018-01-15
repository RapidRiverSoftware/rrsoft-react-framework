import React from 'react'
import styled from 'styled-components'
import Avatar from '../Avatar'
import Split from '../grouping/Split'

export default ({name, size, ...props}) => {
  return (
    <Split push="left" alignItems="center" style={{ width: 'auto', padding: '0 20px' }}>
      <Avatar name={name} size={size} />
      <Name>{name}</Name>
    </Split>
  );
}

const Name = styled.div`
  font-size: 15px;
  color: #fefefe;
`
