// @flow
import React from 'react'
import core from 'rrrjs/lib/framework/core'
import { connect } from 'react-redux'
import { connectModal, Modal } from 'rrrjs/lib/features/modal'

const makeCrud = ({ title, url, list, edit, add, destroy }) => {
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
      items.push(<button key="edit" className="link" onClick={clickEditForm(row.id, props.openModal)}>Edit</button>)
    }

    if (destroy) {
      items.push(<button key="delete" className="link" onClick={clickDelete(row.id)}>Delete</button>)
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
          <EditForm {...props} />
          <button type="submit">Save</button>
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
          <AddForm {...props} />
          <button type="submit">Save</button>
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
        <h1>{title}</h1>
        {AddForm ? <button onClick={clickAddForm(props.openModal)}>Add New</button> : null}
        <ListContainer {...props} />
        {EditForm ? <EditFormContainer {...props} /> : null}
        {AddForm ? <AddFormContainer {...props} /> : null}
      </div>
    )
  })

  return CrudComponent
}

export default makeCrud
