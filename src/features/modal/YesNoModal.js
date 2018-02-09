// @flow
import React from 'react';
import Modal from './Modal';
export { connectModal } from './Modal';

type Props = {|
  id: string,
  text: string,
  action: Function,
|};

const YesNoModalComponent = ({ id, text, action }: Props) => (
  <Modal id={id} primaryAction={['YES', action]}>
    {text}
  </Modal>
);


export default YesNoModalComponent;
