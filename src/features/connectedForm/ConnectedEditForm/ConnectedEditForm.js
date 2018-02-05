// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import ConnectedForm from '../ConnectedForm'


const ConnectedEditFormComponent = (props) => {
  if (!props.hasData) return null

  return (
    <ConnectedForm {...props} onSubmit={props.saveEdit}>
      {props.children}
    </ConnectedForm>
  )
}

const mapStateToProps = (state, props) => {
  const hasData = !!state.getIn(['connectedForm', 'fetchedData', props.url, 'data'])

  return {
    hasData,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    saveEdit(data) {
      dispatch(action.saveEdit(props.url, data.toJS(), props.onSuccess))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedEditFormComponent)
