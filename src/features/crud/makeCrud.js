// @flow
import React from 'react'
import core from 'rrrjs/lib/framework/core'
import { connect } from 'react-redux'
import { connectModal, Modal } from 'rrrjs/lib/features/modal'
import Split from '../../components/grouping/Split'

const makeCrud = ({ name, title, url, list, edit, add, destroy }) => {
  const crudName = name || 'Default'
  const EditForm = edit && edit.EditForm
  const editMapStateToProps = edit && edit.mapStateToProps

  const AddForm = add && add.AddForm
  const addMapStateToProps = add && add.mapStateToProps

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

  const rowActions = (row, actions, props) => {
    const items = []

    if (edit) {
      items.push(<button key="edit" id={`edit${crudName}${row.id}`} className="link" onClick={clickEditForm(row.id, props.openModal)}>Edit</button>)
    }

    if (destroy) {
      items.push(<button key="delete" id={`delete${crudName}${row.id}`} className="link" onClick={clickDelete(row.id)}>Delete</button>)
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
      />
    )
  }

  const clickAddForm = (openModal) => () => {
    core.fn('addForm')(url)
    openModal(addUrl)
  }

  const CrudComponent = connectModal((props) => {
    return (
      <div>
        <Split push="right" alignItems="center">
          <h1>{title}</h1>
          {AddForm ? <button id={`addNew${crudName}`} onClick={clickAddForm(props.openModal)} className="link">Add New</button> : null}
        </Split>
        <ListContainer {...props} />
        {EditForm ? <EditFormContainer {...props} /> : null}
        {AddForm ? <AddFormContainer {...props} /> : null}
      </div>
    )
  })

  return CrudComponent
}

export default makeCrud
