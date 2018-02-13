// @flow
import React from 'react';
import becomeField from './becomeField';
import CompactInputbox from './input/CompactInputbox';

type Props = {
  id: string,
  name: string,
  value: string,
};
export const TextInput = (props: Props) => <CompactInputbox {...props} type="text" />;

export default becomeField(TextInput);
