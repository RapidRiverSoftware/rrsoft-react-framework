// @flow
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import { AvatarAndName } from '../../components/Avatar'
import Split from '../../components/grouping/Split'

const Topbar = ({ name, logo }) => <Layout>
  <Split push="right">
    <div></div>
    <AvatarAndName name={name} size={40} />
  </Split>
</Layout>

const mapStateToProps = (state) => ({
  name: state.getIn(['auth', 'name'])
})

const Layout = withTheme(styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSize(7)};
  background: ${({ theme }) => theme.primaryTopBarBgColor(5)};
`)

export default connect(mapStateToProps)(Topbar)
