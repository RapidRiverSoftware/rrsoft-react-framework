// @flow
import React from 'react'
import core from 'rrrjs/lib/framework/core'
import { connect } from 'react-redux'
import { connectModal } from 'rrrjs/lib/features/modal'


const mapStateToProps = state => {
  return {
    siteId: state.getIn(['connectedForm', 'fetchedData', '/url_maps', 'data', 'site_id'])
  }
}

const makeCrud = ({ url, list, edit, add }) => {
  const EditForm = edit && edit.form

  const EditFormContainer = (props) => {
    const ConnectedEditForm = core.component('ConnectedEditForm')

    const onSuccessEdit = () => {
      props.closeModal(url)
      core.fn('refreshFetch')(url)
    }

    return (
      <ConnectedEditForm url={url} onSuccess={onSuccessEdit}>
        <EditForm {...props} />
        <button type="submit">Save</button>
      </ConnectedEditForm>
    )
  }

  const ListContainer = connectModal((props) => {
    const ConnectedDatagrid = core.component('ConnectedDatagrid')

    return (
      <ConnectedDatagrid
        openModal={props.openModal}
        url={url}
        columns={list.columns}
      />
    )
  })

  const CrudComponent = (props) => {
    return (
      <div>
        i am crud
        <ListContainer {...props} />
        {EditForm ? <EditFormContainer {...props} /> : null}
      </div>
    )
  }

  return CrudComponent
}

export default makeCrud
