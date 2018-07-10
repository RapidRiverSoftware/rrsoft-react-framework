// @flow
import React from 'react';
import becomeField from './becomeField';
import RadioGroup from '../../components/RadioGroup';

type Props = {
  id: string,
  name: string,
  items: array,
  value: string,
};
export const RadioGroupInput = (props: Props) => <RadioGroup {...props} />;

export default becomeField(RadioGroupInput);
