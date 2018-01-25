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

    &.active {
      color: ${({ theme }) => theme.primaryMenuTextColor(4)};
      background-color: ${({ theme }) => theme.primaryMenuBgColor(4)};
    }
  }
  background: #2b5876; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #4e4376, #2b5876); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #4e4376, #2b5876);
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
