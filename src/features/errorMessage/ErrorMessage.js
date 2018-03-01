// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

const Container = styled.div`
  position: fixed;
  width: 100%;
  min-height: 50px;
  top: 75px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Text = styled.span`
  font-size: 15px;
  color: white;
  font-weight: 500;
`;

type Props = {
  errorMessage?: string,
  closeErrorMessage: () => void,
};

export const ErrorMessageComponent = ({ errorMessage, closeErrorMessage }: Props) => {
  if (errorMessage) {
    return (
      <Container onClick={() => closeErrorMessage()}>
        <Text>{errorMessage}</Text>
      </Container>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    errorMessage: state.getIn(['errorMessage', 'errorMessage']),
  }
}

const mapDispatchToProps = dispatch => ({
  closeErrorMessage: bindActionCreators(actions.closeErrorMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageComponent);
