import React from 'react'
import { connect } from 'react-redux';
import Topbar from './Topbar'
import SideMenu from './SideMenu'
import Content from './Content'

const makeAdminPage = (WrappedComponent) => (props) => (
  <div>
    <Topbar />
    <SideMenu />
    <Content component={<WrappedComponent />} />
  </div>
)

export default makeAdminPage
