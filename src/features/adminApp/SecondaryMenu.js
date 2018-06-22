// @flow
import React from 'react'
import { connect } from 'react-redux'
import flatMap from 'lodash/flatMap'
import styled, { withTheme } from 'styled-components'
import core from '../../framework/core'

const Secondary = withTheme(styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #efefef;
  > a {
    color: ${({ theme }) => theme.primaryColor(6)};
    text-decoration: none;
    margin-right: 30px;

    &.active {
      color: ${({ theme }) => theme.primaryTextColor(5)};
    }
  }
`)
const NavLink = core.NavLink
const SideMenu = ({ secondMenu, onItemClick = () => {} }) => {
  const onClick = t => () => onItemClick(t)
  return (
    secondMenu ? <Secondary>
      {
        secondMenu.map(item => <NavLink
          onClick={onClick(item)}
          activeClassName="active"
          key={item.value}
          to={item.value}>
          {item.label}
        </NavLink>)
      }
    </Secondary> : null
  )
}

const mapStateToProps = (state, props) => {
  const mainMenu = state.getIn(['core', 'mainMenu'])
  const router = state.getIn(['router'])
  const currentMenu = mainMenu.find(
    menu => menu.value === router.location.pathname
  )

  let secondMenu
  if (currentMenu) {
    secondMenu = currentMenu.children
  } else {
    const child = flatMap(
      mainMenu.toJS().filter(
        item => item.children
      ).map(
        item => item.children.map(child => ({
          ...child,
          parent: item
        }))
      )
    ).find(menu => menu.value === router.location.pathname)
    secondMenu = child && child.parent.children
  }

  return {
    secondMenu
  }
}

export default connect(mapStateToProps)(SideMenu)
