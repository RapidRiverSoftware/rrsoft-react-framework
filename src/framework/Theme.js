// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import core from './core'

const getThemeSelector = core.createSelector(
  theme => theme ? theme.toJS() : {},
  theme => theme
)

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
    theme: getThemeSelector(theme)
  }
}

export default connect(mapStateToProps)(ThemeComponent)
