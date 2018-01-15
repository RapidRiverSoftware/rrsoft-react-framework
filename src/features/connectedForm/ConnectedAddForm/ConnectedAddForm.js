// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import ConnectedForm from '../ConnectedForm'


const ConnectedAddFormComponent = (props) => {
  if (!props.hasData) return null

  return (
    <ConnectedForm {...props} onSubmit={props.saveAdd}>
      {props.children}
    </ConnectedForm>
  )
}


const mapStateToProps = (state, props) => {
  const hasData = !!state.getIn(['connectedForm', 'fetchedData', props.url])

  return {
    hasData,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    saveAdd(data) {
      dispatch(action.saveAdd(props.url, data.toJS(), props.onSuccess))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAddFormComponent)
