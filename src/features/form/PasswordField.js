// @flow
import React from 'react';
import becomeField from './becomeField';
import Inputbox from './input/Inputbox';

type Props = {
  name: string,
  value: string,
};
export const PasswordInput = (props: Props) => <Inputbox {...props} type="password" />;

export default becomeField(PasswordInput);
