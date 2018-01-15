// @flow

import React from 'react';
import Selectbox from './Selectbox'
import {connect} from 'react-redux'
import core from '../../../framework/core'
import toJS from '../../../util/redux/toJS'

class ChooseboxComponent extends React.Component {
  componentDidMount() {
    core.fn('fetchOption')(this.props.url)
  }

  render() {
    const options = [{label: "Choose a value", value: ""}, ...(this.props.options || [])]

    return (
      <Selectbox {...this.props} options={options} />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    options: state.getIn(['featuresForm', 'options', props.url])
  }
}


export default connect(mapStateToProps)(toJS(ChooseboxComponent))
