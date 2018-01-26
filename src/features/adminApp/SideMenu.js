// @flow
import React from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { NavLink } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'

const Side = withTheme(styled.div`
  height: 100%;
  width: 250px;
  &, a {
    color: ${({ theme }) => theme.primaryMenuTextColor(6)};
    font-size: ${({ theme }) => theme.fontSize(5)};
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    font-weight: ${({ theme }) => theme.fontWeight(7)};
    margin-left: 20px;

    &.active {
      color: ${({ theme }) => theme.primaryTextColor(4)};
      background: ${({ theme }) => theme.primaryMenuActiveBgColor(5)};
      box-shadow: ${({ theme }) => theme.primaryMenuActiveShadow(5)};
    }
  }
  background: ${({ theme }) => theme.primaryMenuBgColor(5)};
`);

const Menu = styled.div`
`

const Logo = styled.div`
  height: 50px;
  margin-bottom: 20px;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSize(6)};
`

const SideMenu = ({ mainMenu, logo }) => {
  return (
    <Side>
      <Logo>{ logo }</Logo>
      <Menu>
        {
          mainMenu.map(item => <NavLink activeClassName="active" key={item.value} to={item.value}>{item.label}</NavLink>)
        }
      </Menu>
    </Side>
  )
}

const mapStateToProps = (state) => {
  const mainMenu = state.getIn(['core', 'mainMenu'])
  return {
    mainMenu: mainMenu ? mainMenu.toJS() : []
  }
}

export default connect(mapStateToProps)(withTheme(SideMenu))
