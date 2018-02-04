// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import Datagrid from '../../../components/Datagrid'
import toJS from '../../../util/redux/toJS'

class ConnectedDatagridComponent extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.url, this.props.name, 1)
  }

  render() {
    const { actions, pageData, columns, url, name } = this.props

    if (!pageData) return null

    console.log('pppd', pageData)

    return (
        <Datagrid
          columns={columns}
          pageData={pageData}
          actions={actions}
          handlePageClick={(p)=>this.props.fetchList(url, name, p)}
        />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    pageData: state.getIn(['connectedDatagrid', props.name])
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchList: (url, name, currentPage) => dispatch(action.fetchList(url, name, currentPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConnectedDatagridComponent))
