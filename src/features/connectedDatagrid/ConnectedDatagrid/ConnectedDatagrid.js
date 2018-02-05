// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import Datagrid from '../../../components/Datagrid'
import toJS from '../../../util/redux/toJS'

class ConnectedDatagridComponent extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.url, 1)
  }

  render() {
    const { actions, pageData, columns, url } = this.props

    if (!pageData) return null

    return (
      <Datagrid
        columns={columns}
        pageData={pageData}
        actions={actions}
        handlePageClick={(p)=>this.props.fetchList(url, p)}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    pageData: state.getIn(['connectedDatagrid', 'fetchedData', props.url])
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchList: (url, currentPage) => dispatch(action.fetchList(url, currentPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConnectedDatagridComponent))
