// @flow
import React from 'react';
import becomeField from './becomeField';
import DisplayOnlyBox from './input/DisplayOnlyBox';

type Props = {
  id: string,
  name: string,
  value: string,
};
export const DisplayOnlyBoxComponent = (props: Props) => <DisplayOnlyBox {...props} />;

export default becomeField(DisplayOnlyBoxComponent);
