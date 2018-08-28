// @flow
import React from 'react'
import pick from 'lodash/pick'
import core from 'rrrjs/lib/framework/core'
import { connect } from 'react-redux'
import { connectModal, Modal } from 'rrrjs/lib/features/modal'
import Split from '../../components/grouping/Split'

const makeCrud = (props) => {
  const { name, title, description, url, list, edit, add, detail, destroy } = props

  const crudName = name || 'Default'
  const EditForm = edit && edit.EditForm
  const editMapStateToProps = edit && edit.mapStateToProps

  const AddForm = add && add.AddForm
  const addMapStateToProps = add && add.mapStateToProps

  const detailColumns = detail && detail.columns

  const columns = list && list.columns

  const addUrl = `add:${url}`
  const editUrl = `edit:${url}`

  const clickEditForm = (id, openModal) => () => {
    core.fn('editForm')(url, id)
    openModal(editUrl)
  }

  const onSuccessDelete = () => {
    core.fn('refreshFetch')(url)
  }

  const clickDelete = (id) => () => {
    core.fn('deleteRow')(url, id, onSuccessDelete)
  }

  const getShowRowModalId = () => `${url}/detail`

  const clickDetail = (row, ridx, openModal) => () => {
    core.fn('showRow')(url, row, ridx)
    openModal(getShowRowModalId())
  }

  const detailMapStateToProps = state => {
    const searchFields = state.getIn(['connectedDatagrid', 'lastFetched', url, 'searchFields'])
    const searchFormValues = state.getIn(['form', 'search', 'values'])
    const searchValues = pick(
      searchFormValues ? searchFormValues.toJS() : {},
      searchFields ? searchFields.toJS() : []
    )

    return {
      searchValues,
      showRow: state.getIn(['crud', 'showRow', url]),
      showRowIdx: state.getIn(['crud', 'showRowIdx', url])
    }
  }

  const DetailContainer = connect(detailMapStateToProps)((props) => {
    const { searchValues, showRow } = props
    const ConnectedDatagrid = core.component('ConnectedDatagrid')
    const detailQuery = { ...searchValues, ...showRow }
    const detailUrl = `${url}/detail?${core.api.serialize(detailQuery)}`

    return (
      <Modal id={getShowRowModalId()}>
        <ConnectedDatagrid
          url={detailUrl}
          columns={detailColumns}
        />
      </Modal>
    )
  })

  const rowActions = (row, actions, props, ridx) => {
    const items = []

    if (edit) {
      items.push(<button key="edit" id={`edit${crudName}${row.id}`} className="link" onClick={clickEditForm(row.id, props.openModal)}>Edit</button>)
    }

    if (destroy) {
      items.push(<button key="delete" id={`delete${crudName}${row.id}`} className="link" onClick={clickDelete(row.id)}>Delete</button>)
    }

    if (detail) {
      items.push(<button key="detail" className="link" onClick={clickDetail(row, ridx, props.openModal)}>More detail</button>)
    }

    return items
  }

  if (columns) {
    columns.push({ label: 'actions', render: rowActions })
  }

  const EditFormContainer = connect(editMapStateToProps)((props) => {
    const ConnectedEditForm = core.component('ConnectedEditForm')

    const onSuccessEdit = () => {
      props.closeModal(editUrl)
      core.fn('refreshFetch')(url)
    }

    return (
      <Modal id={editUrl}>
        <ConnectedEditForm url={url} onSuccess={onSuccessEdit}>
          <div style={{ padding: '0 20px 20px', width: 900, height: 400, overflow: 'scroll' }}>
            <EditForm {...props} />
          </div>
          <button type="submit" id={`saveEdit${crudName}`}>Save</button>
        </ConnectedEditForm>
      </Modal>
    )
  })

  const AddFormContainer = connect(addMapStateToProps)((props) => {
    const ConnectedAddForm = core.component('ConnectedAddForm')

    const onSuccessAdd = () => {
      props.closeModal(addUrl)
      core.fn('refreshFetch')(url)
    }

    return (
      <Modal id={addUrl}>
        <ConnectedAddForm url={url} onSuccess={onSuccessAdd}>
          <div style={{ padding: '0 20px 20px', width: 900, height: 400, overflow: 'scroll' }}>
            <AddForm {...props} />
          </div>
          <button type="submit" id={`saveAdd${crudName}`}>Save</button>
        </ConnectedAddForm>
      </Modal>
    )
  })

  const ListContainer = (props) => {
    const ConnectedDatagrid = core.component('ConnectedDatagrid')

    return (
      <ConnectedDatagrid
        openModal={props.openModal}
        url={url}
        columns={list.columns}
        searchForm={list.SearchForm}
        searchFields={list.searchFields}
        searchMapStateToProps={list.searchMapStateToProps}
        searchMassActions={list.searchMassActions}
      />
    )
  }

  const clickAddForm = (openModal) => () => {
    core.fn('addForm')(url)
    openModal(addUrl)
  }

  const CrudComponent = connect(crudMapStateToProps)(connectModal((props) => {
    return (
      <div>
        {props.isDeleting ? <div style={{ display: 'none' }} id="isDeleting"></div> : null }
        <Split push="right" alignItems="center">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          {AddForm ? <button id={`addNew${crudName}`} onClick={clickAddForm(props.openModal)} className="link">Add New</button> : null}
        </Split>
        <ListContainer {...props} />
        {EditForm ? <EditFormContainer {...props} /> : null}
        {AddForm ? <AddFormContainer {...props} /> : null}
        {detailColumns ? <DetailContainer {...props} /> : null}
      </div>
    )
  }))

  return CrudComponent
}

const crudMapStateToProps = (state) => {
  return {
    isDeleting: state.getIn(['crud', 'isDeleting'])
  }
}

export default makeCrud
