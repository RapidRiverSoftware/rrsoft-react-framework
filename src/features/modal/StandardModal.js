// @flow
import React from 'react';
import styled from 'styled-components';
import { Modal, connectModal } from './Modal';
import ModalBody from './ModalBody';
import Button from '../../components/button/Button';
import SnapToBottom from '../../components/grouping/SnapToBottom';
import Split from '../../components/grouping/Split';
import Box from '../../components/grouping/Box';
import CloseIconButton from '../../components/button/CloseIconButton';
import TextRight from '../../components/grouping/TextRight';

const ACTION_NAME = 0;
const ACTION_FN = 1;
const ACTION_PROPS = 2;

type Props = {|
  id: string,
  closeModal: Function,
  cancelModal: Function,
  afterOpen: Function | null,
  primaryAction: [string, Function, Object],
  title?: string,
  subTitle?: string,
  children: React.Element<*>,
  width?: string,
  indent?: string,
  alignTo?: 'top' | 'center',
  hideBottomButtons: boolean
|};

const StandardModalComponent = ({
  id,
  closeModal,
  cancelModal,
  afterOpen,
  primaryAction,
  hideBottomButtons,
  title,
  subTitle,
  children,
  width,
  indent = 'more',
  alignTo,
}: Props) => {
  const containers = {
    none: NoneIndentContainer,
    less: LessIndentContainer,
    more: MoreIndentContainer,
    extra: ExtraIndentContainer,
  };

  const Container = containers[indent];

  return (
    <Modal id={id} alignTo={alignTo} afterOpen={afterOpen} hideBottomButtons={hideBottomButtons}>
      <ModalBody width={width} hideBottomButtons={hideBottomButtons}>
        <TextRight>
          <CloseIconButton stroke="neutral" onClick={cancelModal ? () => cancelModal() : () => closeModal()} />
        </TextRight>
        {title && <Title>{title}</Title>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <Container>{children}</Container>
        { !hideBottomButtons &&
          (<SnapToBottom>
            <Split>
              <Button
                backgroundColor="xxxlighterNeutral"
                color="neutral"
                onClick={cancelModal ? () => cancelModal() : () => closeModal()}
                className="cancel-modal-btn"
              >
                CANCEL
              </Button>
              {renderAction(primaryAction)}
            </Split>
          </SnapToBottom>) }
      </ModalBody>
    </Modal>
  );
};

const renderAction = (primaryAction) => {
  if (primaryAction) {
    return (
      <Button
        className={primaryAction[ACTION_NAME]}
        onClick={primaryAction[ACTION_FN]}
        style={{ textTransform: 'uppercase', marginRight: -1 }}
        {...primaryAction[ACTION_PROPS] || {}}
      >
        {primaryAction[ACTION_NAME]}
      </Button>
    );
  }

  return null;
};

const NoneIndentContainer = styled(Box)`
  padding: 0px 0px;
  min-width: 300px;
`;

const LessIndentContainer = styled(Box)`
  padding: 0px 30px;
  min-width: 300px;
`;

const MoreIndentContainer = styled(Box)`
  padding: 0px 50px;
  min-width: 300px;
`;

const ExtraIndentContainer = styled(Box)`
  padding: 0px 80px;
  min-width: 300px;
`;

const Title = styled.h1`
  font-weight: 300;
  padding-left: 30px;
  margin-top: -20px;
`;

const SubTitle = styled.h2`
  font-weight: 300;
  padding-left: 60px;
`;

export default connectModal(StandardModalComponent);
