// @flow
import React from 'react'
import { connect } from 'react-redux'
import toJS from '../../../util/redux/toJS'
import { reduxForm } from 'redux-form/immutable'
import * as action from '../action'

class ConnectedFormComponent extends React.Component {
  componentWillUnmount() {
    this.props.resetData(this.props.url)
  }

  render() {
    return <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
  }
}

const mapStateToProps = (state, props) => {
  let data = state.getIn(['connectedForm', 'fetchedData', props.url, 'data'])
  data = data ? data.toJS() : undefined

  return {
    form: props.url,
    initialValues: data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetData(url) {
      dispatch(action.resetData(url))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm()(toJS(ConnectedFormComponent))
)
