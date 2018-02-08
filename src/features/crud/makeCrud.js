// @flow
import React from 'react'
import core from 'rrrjs/lib/framework/core'
import { connect } from 'react-redux'
import { connectModal, Modal } from 'rrrjs/lib/features/modal'



const makeCrud = ({ title, url, list, edit, add }) => {
  const EditForm = edit && edit.form
  const editMapStateToProps = edit && edit.mapStateToProps
  const columns = list && list.columns

  const makeClick = (id, openModal) => () => {
    core.fn('editForm')(url, id)
    openModal(url)
  }

  const rowActions = (row, actions, props) => {
    return <button className="link" onClick={makeClick(row.id, props.openModal)}>Edit</button>
  }

  if (columns) {
    columns.push({ label: 'actions', render: rowActions })
  }

  const EditFormContainer = connectModal(connect(editMapStateToProps)((props) => {
    const ConnectedEditForm = core.component('ConnectedEditForm')

    const onSuccessEdit = () => {
      props.closeModal(url)
      core.fn('refreshFetch')(url)
    }

    return (
      <Modal id={url}>
        <ConnectedEditForm url={url} onSuccess={onSuccessEdit}>
          <EditForm {...props} />
          <button type="submit">Save</button>
        </ConnectedEditForm>
      </Modal>
    )
  }))

  const ListContainer = connectModal((props) => {
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
  })

  const CrudComponent = (props) => {
    return (
      <div>
        <h1>{title}</h1>
        <ListContainer {...props} />
        {EditForm ? <EditFormContainer {...props} /> : null}
      </div>
    )
  }

  return CrudComponent
}

export default makeCrud
