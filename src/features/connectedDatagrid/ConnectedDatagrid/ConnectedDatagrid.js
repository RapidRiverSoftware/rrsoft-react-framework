// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import Datagrid from '../../../components/Datagrid'
import toJS from '../../../util/redux/toJS'
import { TextField } from '../../../features/form'
import {reduxForm} from 'redux-form/immutable'


class ConnectedDatagridComponent extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.url, 1)
  }

  render() {
    const { pageData, url, searchForm, fetchList } = this.props

    if (!pageData) return null

    return (
      <div>
        <SearchFormContainer fetchList={this.props.fetchList} url={url} searchForm={searchForm} />
        <Datagrid
          {...this.props}
          handlePageClick={(p) => fetchList(url, p)}
        />
      </div>
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

let InnerSearchForm = ({handleSubmit, searchForm: SearchForm}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchForm />
        <input type="submit" name="do_action" value="Search" />
      </form>
    </div>
  )
}

InnerSearchForm = reduxForm({ form: 'search' })(InnerSearchForm)

const SearchFormContainer = ({ fetchList, url, searchForm }) => {
  const onSubmit = (value) => {
    fetchList(url, 1)
  }

  return <InnerSearchForm onSubmit={onSubmit} searchForm={searchForm} />
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConnectedDatagridComponent))
