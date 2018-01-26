// @flow
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import LoginWidget from './LoginWidget'

const LoginPage = ({ logo }) => <Layout>
  <div>
    <Logo>{logo}</Logo>
    <LoginWidget />
  </div>
</Layout>

const Logo = styled.div`
  transform: scale(1.7);
  margin-bottom: 20px;
`;

const Layout = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.primaryMaskBgColor(5)};

  > div {
    width: 400px;
    padding: 40px 40px 0 40px;
    position: relative;
    background-color: #fefefe;

    form {
      padding-bottom: 40px;
      button {
        margin-top: 40px;
      }
    }
  }
`)

const mapStateToProps = (state) => ({
  logo: state.getIn(['core', 'logo'])
})

export default connect(mapStateToProps)(LoginPage)
