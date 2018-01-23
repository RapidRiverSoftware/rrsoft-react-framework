// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'

const ThemeComponent = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  const theme = state.getIn(['core', 'theme'])
  return {
    theme: theme ? theme.toJS() : {}
  }
}

export default connect(mapStateToProps)(ThemeComponent)
