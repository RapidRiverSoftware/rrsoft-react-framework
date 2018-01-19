// @flow
import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form/immutable';
import memoize from 'lodash/memoize';
import validators from './validators';

const mapStringToFn = (propsValidators) => {
  let validatorFns = [];

  if (propsValidators) {
    validatorFns = validatorFns.concat(
      propsValidators.map((propsValidator) => {
        const [fn, paramsString] = propsValidator.split('|');
        let params;

        if (paramsString) {
          params = paramsString.split(':');
        }

        return validators[fn].apply(null, params);
      }),
    );
  }

  return validatorFns;
};

const becomeField = (WrappedInputComponent: any) => (props: Object) => {
  const Com = memoBecomeReduxFormInput(WrappedInputComponent);

  let validatorFns = mapStringToFn(props.validators);

  if (props.validate) {
    validatorFns = validatorFns.concat(props.validate);
  }

  return (
    <div>
      <Field {...props} validate={validatorFns} component={Com} />
    </div>
  );
};

const becomeReduxFormInput = WrappedInputComponent => (props) => {
  const { input, label, meta: { active, touched, error }, ...inputProps } = props;
  const gotError = touched && error;

  return (
    <div>
      {renderLabel(label, input.name, active)}
      <WrappedInputComponent {...input} {...inputProps} isActive={active} />
      <span style={{ color: 'red' }}>{gotError ? error : null}</span>
    </div>
  );
};

const memoBecomeReduxFormInput = memoize(becomeReduxFormInput);

const renderLabel = (label, name, isActive) => {
  if (label) {
    return (
      <Label htmlFor={name} isActive={isActive}>
        {label}
      </Label>
    );
  }

  return <div style={{ height: '20px' }} />;
};

const Label = styled.label`
  ${'' /* color: ${({ isActive }) => (isActive ? color.secondary : color.lightNeutral)}; */}
  display: block;
  line-height: 20px;
  ${'' /* font-size: ${font.xsmall}; */}
`;

export default becomeField;
