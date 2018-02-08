// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import Datagrid from '../../../components/Datagrid'
import toJS from '../../../util/redux/toJS'
import {reduxForm} from 'redux-form/immutable'


class ConnectedDatagridComponent extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.url, 1)
  }

  render() {
    const { pageData, url, searchForm, fetchList, searchFields } = this.props

    if (!pageData) return null

    return (
      <div>
        <SearchFormContainer
          fetchList={this.props.fetchList}
          url={url}
          searchForm={searchForm}
          searchFields={searchFields}
        />

        <Datagrid
          {...this.props}
          handlePageClick={(p) => fetchList(url, p, searchFields)}
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
    fetchList: (url, currentPage, searchFields) => dispatch(action.fetchList(url, currentPage, searchFields))
  }
}

let InnerSearchForm = ({handleSubmit, searchForm: SearchForm}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchForm />
        <input type="submit" name="doAction" value="Search" />
      </form>
    </div>
  )
}

InnerSearchForm = reduxForm({ form: 'search' })(InnerSearchForm)

const SearchFormContainer = ({ fetchList, url, searchForm, searchFields }) => {
  const onSubmit = (value) => {
    fetchList(url, 1, searchFields)
  }

  return <InnerSearchForm onSubmit={onSubmit} searchForm={searchForm} />
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConnectedDatagridComponent))
