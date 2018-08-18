// @flow
// Reusable Modal component based on react-modal.
import React from 'react';
import { injectGlobal } from 'styled-components';
import merge from 'lodash/merge';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from './action';

const transitionMs = 250;

const ModalComponent = ({ isOpen, afterOpen, id, closeModal, alignTo = 'center', children }) => (
  <ReactModal
    contentLabel="modal sample"
    style={merge(customStyles, alignToStyles[alignTo])}
    isOpen={isOpen}
    onAfterOpen={afterOpen}
    ariaHideApp={false}
    onRequestClose={() => {
      closeModal(id);
    }}
    closeTimeoutMS={transitionMs}
  >
    {children}
  </ReactModal>
);

const mapStateToPropsForModal = (state, props) => ({
  isOpen: props.id === state.getIn(['modal', 'openedModal']),
});

const mapDispatchToPropsForModal = dispatch => ({
  closeModal: () => {
    dispatch(actions.closeModal());
  },
});

const mapDispatchToPropsForConnect = dispatch => ({
  openModal: (id) => {
    dispatch(actions.openModal(id));
  },
  closeModal: () => {
    dispatch(actions.closeModal());
  },
});

export const connectModal = (WrappedComponent: any) =>
  connect(null, mapDispatchToPropsForConnect)(WrappedComponent);

export const Modal = connect(mapStateToPropsForModal, mapDispatchToPropsForModal)(ModalComponent);

const alignToStyles = {
  top: {
    content: {
      top: '8%',
      transform: 'translate(-50%, 0)',
    },
  },
  center: {
    content: {
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};

const customStyles = {
  overlay: {
    zIndex: 101,
  },
  content: {
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: 0,
    padding: '0px',
    borderWidth: 1,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'scroll',
    maxHeight: '95vh',
  },
};

/* eslint-disable no-unused-expressions */
injectGlobal`
.ReactModal__Body--open {
  overflow: hidden;
}
.ReactModalPortal > div {
  opacity: 0;
}
.ReactModalPortal .ReactModal__Overlay {
  transition: opacity ${transitionMs}ms ease-in-out;
  &--after-open {
    opacity: 1;
  }
  &--before-close {
    opacity: 0;
  }
}`;
/* eslint-enable no-unused-expressions */
