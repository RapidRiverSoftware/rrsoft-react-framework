// @flow
import React from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Link } from 'react-router-dom'

const SideMenu = ({ mainMenu }) => {
  return (
    <div>
      {
        mainMenu.map(item => <Link key={item.value} to={item.value}>{item.label}</Link>)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const mainMenu = state.getIn(['core', 'mainMenu'])
  return {
    mainMenu: mainMenu ? mainMenu.toJS() : []
  }
}

export default connect(mapStateToProps)(SideMenu)
