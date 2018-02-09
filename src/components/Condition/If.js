// @flow
import * as React from 'react';

type Props = {
  true: any,
  children: React.Node
};

const If = (props: Props) => props.true ? props.children : null

export default If;
