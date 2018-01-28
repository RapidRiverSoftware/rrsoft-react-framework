// @flow
import React from 'react';
import StandardModal from './StandardModal';
import { connectModal as connectModalImport } from './Modal';

type Props = {|
  id: string,
  text: string,
  action: Function,
|};

const YesNoModalComponent = ({ id, text, action }: Props) => (
  <StandardModal id={id} primaryAction={['YES', action]}>
    {text}
  </StandardModal>
);

export const connectModal = connectModalImport;

export default YesNoModalComponent;
