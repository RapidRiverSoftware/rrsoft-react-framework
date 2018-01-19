// @flow
import React from 'react';
import becomeField from './becomeField';
import Inputbox from './input/Inputbox';

type Props = {
  name: string,
  value: string,
};
export const TextInput = (props: Props) => <Inputbox {...props} type="text" />;

export default becomeField(TextInput);
