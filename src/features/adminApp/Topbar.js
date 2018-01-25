// @flow
import React from 'react'
import styled, { withTheme } from 'styled-components'

const Topbar = ({ logo }) => {
  return <Layout>
  </Layout>
}

const Layout = withTheme(styled.div`
  display: flex;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSize(7)}
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #ECE9E6, #FFFFFF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #ECE9E6, #FFFFFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`)

export default Topbar
