// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import ConnectedForm from '../ConnectedForm'


const ConnectedEditFormComponent = (props) => {
  if (!props.hasData) return null

  return (
    <ConnectedForm {...props} onSubmit={(data) => props.saveEdit(props.id, data)}>
      {props.children}
    </ConnectedForm>
  )
}

const mapStateToProps = (state, props) => {
  const data = state.getIn(['connectedForm', 'fetchedData', props.url, 'data'])
  const hasData = !!data

  const id = hasData ? data.get('id') : null

  return {
    hasData,
    id
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    saveEdit(id, data) {
      dispatch(action.saveEdit(props.url, id, data.toJS()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedEditFormComponent)
