// @flow
import React from 'react';
import AceEditor from 'react-ace';
import camelCase from 'lodash/camelCase';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/json';
import 'brace/theme/github';

type Props = {
  label: string,
  value: string,
  onChange: Function
};

const StandardCodeEditor = ({ mode="javascript", label, value, height = '120px', width, onChange, ...props }: Props) =>
  <div>
    <div><strong>{label}</strong></div>
    <AceEditor
      mode={mode}
      theme="github"
      onChange={onChange}
      name={camelCase(label)}
      value={value}
      width={width}
      height={height}
      editorProps={{$blockScrolling: true}}
      {...props}
    />
  </div>;

export default StandardCodeEditor;
