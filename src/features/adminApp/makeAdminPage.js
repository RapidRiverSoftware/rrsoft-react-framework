import React from 'react'
import { connect } from 'react-redux';
import Topbar from './Topbar'
import SideMenu from './SideMenu'
import Content from './Content'
import memoize from 'lodash/memoize'

const makeAdminPage = (WrappedComponent) => (props) => (
  <div>
    <Topbar />
    <SideMenu />
    <Content component={<WrappedComponent />} />
  </div>
)

export default memoize(makeAdminPage)
