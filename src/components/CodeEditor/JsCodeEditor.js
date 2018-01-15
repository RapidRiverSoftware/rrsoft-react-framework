// @flow
import React from 'react';
import AceEditor from 'react-ace';
import camelCase from 'lodash/camelCase';

import 'brace/mode/javascript';
import 'brace/theme/github';

type Props = {
  label: string,
  value: string,
  onChange: Function
};

const style = {
  container: {},
};

const JsCodeEditor = ({ label, value, onChange }: Props) =>
  <div style={style.container}>
    <div><strong>{label}</strong></div>
    <AceEditor
      mode="javascript"
      theme="github"
      onChange={onChange}
      name={camelCase(label)}
      value={value}
      height={'120px'}
      editorProps={{$blockScrolling: true}}
    />
  </div>;

export default JsCodeEditor;
