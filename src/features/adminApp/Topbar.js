// @flow
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import { AvatarAndName } from '../../components/Avatar'
import Split from '../../components/grouping/Split'

const Topbar = ({ leftCorner, content, rightCorner, logo }) => <Layout>
  <Left>
    {leftCorner}
    {logo}
  </Left>
  <Right>
    <Content>{content}</Content>
    {rightCorner}
  </Right>
</Layout>

const mapStateToProps = (state) => ({
  name: state.getIn(['auth', 'name'])
})

const Layout = withTheme(styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primaryTopBarBgColor(5)};
  font-size: ${({ theme }) => theme.fontSize(6)};
  color: #ffffff;
`)

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  > * {
    margin-left: 20px;
  }
`

const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
  > * {
    margin-left: 20px;
  }
`

const Content = styled.div`
  width: 100%;
`

export default connect(mapStateToProps)(Topbar)
