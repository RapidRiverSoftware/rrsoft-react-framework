import React from 'react'
import jdenticon from 'jdenticon'
import styled from 'styled-components'

export default ({ name, size }) => <Wrap
  dangerouslySetInnerHTML={{__html: jdenticon.toSvg(name, size / 1.5)}}
  size={size}
  title={name}
></Wrap>


const Wrap = styled.div`
  font-size: 0px;
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`
