import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import memoize from 'lodash/memoize'
import Topbar from './Topbar'
import SideMenu from './SideMenu'
import Content from './Content'
import MenuIcon from '../../components/Icon/Menu'
import { AvatarAndName } from '../../components/Avatar'

const mapStateToProps = (state) => ({
  name: state.getIn(['auth', 'name'])
})

const makeAdminPage = (WrappedComponent, logo) => connect(mapStateToProps)((props) => (
  <Layout>
    <Occupy height={50}>
      <Top>
        <Topbar
          leftCorner={<MenuIcon color="#ffffff" />}
          logo={logo}
          rightCorner={<AvatarAndName name={props.name} size={40} />} />
      </Top>
    </Occupy>
    <Body>
      <Content component={<WrappedComponent {...props} />} />
    </Body>
  </Layout>
))

const Occupy = styled.div`
  height: ${({ height })=>height}px;
  width: 100vw;
`
const Top = withTheme(styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
`)
const Layout = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.primaryBodyBgColor(5)};
`);
const Body = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
`)
const Side = withTheme(styled.div`
  height: 100vh;
  box-sizing: border-box;
  overflow: overlay;
  display: flex;
  flex-direction: column;
`)


export default memoize(makeAdminPage)
