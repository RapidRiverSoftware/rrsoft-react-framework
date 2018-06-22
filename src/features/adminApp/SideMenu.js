// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'
import core from '../../framework/core'

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
      color: ${({ theme }) => theme.primaryTextColor(4)};
      background: ${({ theme }) => theme.primaryMenuActiveBgColor(5)};
      box-shadow: ${({ theme }) => theme.primaryMenuActiveShadow(5)};
    }
  }
  background: ${({ theme }) => theme.primaryMenuBgColor(5)};
`);

const Menu = styled.div`
`
const NavLink = core.NavLink
const SideMenu = ({ mainMenu, onItemClick = () => {} }) => {
  const onClick = t => () => onItemClick(t)
  return (
    <Side>
      <Menu>
        {
          mainMenu.map(item => <NavLink
            onClick={onClick(item)}
            activeClassName="active"
            key={item.value}
            to={item.value}>
            {item.label}
          </NavLink>)
        }
      </Menu>
    </Side>
  )
}

const mapStateToProps = (state, props) => {
  const mainMenu = state.getIn(['core', 'mainMenu'])
  return {
    mainMenu: mainMenu ? mainMenu.toJS() : []
  }
}

export default connect(mapStateToProps)(SideMenu)
