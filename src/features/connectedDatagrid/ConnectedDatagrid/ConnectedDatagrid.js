// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as action from '../action'
import Datagrid from '../../../components/Datagrid'
import Split from '../../../components/grouping/Split'
import Smaller from '../../../components/grouping/Smaller'
import toJS from '../../../util/redux/toJS'
import {reduxForm} from 'redux-form/immutable'


class ConnectedDatagridComponent extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.url, 1)
  }

  render() {
    const { pageData, url, fetchList, searchFields } = this.props

    if (!pageData) return null

    return (
      <div>
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

let InnerSearchForm = ({ handleSubmit, searchForm: SearchForm }) => {
  return (
    <Smaller scale={0.7} style={{ marginBottom: 20 }}>
      <form onSubmit={handleSubmit}>
        <Split push="right" gap={20}>
          <SearchForm />
          <div>
            <button type="submit"
              name="doAction"
              id="doSearch"
              className="auto full-height">Search</button>
          </div>
        </Split>
      </form>
    </Smaller>
  )
}

InnerSearchForm = reduxForm({ form: 'search' })(InnerSearchForm)

const SearchFormContainer = ({ fetchList, url, searchForm, searchFields }) => {
  const onSubmit = (value) => {
    fetchList(url, 1, searchFields)
  }

  return <InnerSearchForm onSubmit={onSubmit} searchForm={searchForm} />
}

const DatagridOnly = connect(mapStateToProps)(toJS(ConnectedDatagridComponent))

const DatagridAndSearch = (props) => {
  const { url, fetchList, searchFields, searchForm } = props

  return (
    <div>
      {
        searchForm ?
          <SearchFormContainer
            fetchList={fetchList}
            url={url}
            searchForm={searchForm}
            searchFields={searchFields}
          />
          :
          null
      }
      <DatagridOnly {...props} />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(DatagridAndSearch)
