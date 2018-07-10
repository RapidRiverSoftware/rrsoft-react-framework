// @flow
import React from 'react'
import { connect } from 'react-redux'
import toJS from '../../../util/redux/toJS'
import { reduxForm } from 'redux-form/immutable'
import * as action from '../action'

class ConnectedLocalFormComponent extends React.Component {
  componentWillUnmount() {
    this.props.resetData(this.props.id)
  }

  render() {
    return <form onSubmit={() => {}}>{this.props.children}</form>
  }
}

const mapStateToProps = (state, props) => {
  return {
    form: props.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetData(id) {
      dispatch(action.resetLocalData(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm()(toJS(ConnectedLocalFormComponent))
)
