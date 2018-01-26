import React from 'react'
import styled, { withTheme } from 'styled-components'
import Topbar from './Topbar'
import SideMenu from './SideMenu'
import Content from './Content'
import memoize from 'lodash/memoize'

const makeAdminPage = (WrappedComponent, logo) => (props) => (
  <Layout>
    <Side>
      <SideMenu logo={logo} />
    </Side>
    <Body>
      <Topbar />
      <Content component={<WrappedComponent {...props} />} />
    </Body>
  </Layout>
)

const Layout = withTheme(styled.div`
  display: flex;
  flex-direction: row;
`);

const Body = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`)

const Side = withTheme(styled.div`
  height: 100vh;
  box-sizing: border-box;
  overflow: overlay;
  display: flex;
  flex-direction: column;
`)

export default memoize(makeAdminPage)
