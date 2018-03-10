import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import memoize from 'lodash/memoize'
import Topbar from './Topbar'
import SideMenu from './SideMenu'
import Content from './Content'
import MenuIcon from '../../components/Icon/Menu'
import { AvatarAndName } from '../../components/Avatar'
import { openMenu, closeMenu } from './action'


const mapStateToProps = (state) => ({
  name: state.getIn(['auth', 'name']),
  menuOpened: state.getIn(['adminApp', 'menuOpened']),
})

const mapDispatchToProps = dispatch => ({
  openMenu: () => dispatch(openMenu()),
  closeMenu: () => dispatch(closeMenu())
});

const makeAdminPage = (WrappedComponent, logo) => connect(mapStateToProps, mapDispatchToProps)((props) => {
  return <Layout>
    <Occupy height={50}>
      <Top>
        <Topbar
          leftCorner={<MenuToggle onClick={props.menuOpened ? props.closeMenu : props.openMenu}>
            <MenuIcon color="#ffffff" />
          </MenuToggle>}
          logo={logo}
          rightCorner={<AvatarAndName name={props.name} size={40} />} />
      </Top>
    </Occupy>
    <Body>
      <Side opened={props.menuOpened}>
        <SideMenu onItemClick={props.closeMenu} />
      </Side>
      <Content component={<WrappedComponent {...props} />} />
    </Body>
    <SideMask opened={props.menuOpened} onClick={props.closeMenu} />
  </Layout>
})

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
  position: fixed;
  top: 50px;
  left: 0;
  display: ${({ opened }) => opened ? 'block' : 'none'};
  box-shadow: 2px -2px 10px rgba(0,0,0,0.4);
  z-index: 1000;
`)
const SideMask = styled.div`
  position: fixed;
  width: 100vh;
  height: 100vh;
  z-index: 950;
  top: 50px;
  left: 0;
  background-color: rgba(0,0,0,0.8);
  width: 100%;
  display: ${({ opened }) => opened ? 'block' : 'none'};
`
const MenuToggle = styled.div`
  cursor: pointer;
  display: inline-flex;
`


export default memoize(makeAdminPage)
