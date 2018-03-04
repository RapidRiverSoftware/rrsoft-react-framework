// @flow
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Field } from 'redux-form/immutable';
import memoize from 'lodash/memoize';
import validators from './validators';
import uuid from '../../util/fn/uuid';

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
  const { id, input, label, meta: { active, touched, error }, ...inputProps } = props;
  const gotError = touched && error;
  const htmlId = id || `field_${input.name}`;

  return (
    <FieldWrap>
      {renderLabel(label, htmlId, active)}
      <WrappedInputComponent id={htmlId} {...input} {...inputProps} isActive={active} />
      <span style={{ color: 'red' }}>{gotError ? error : null}</span>
    </FieldWrap>
  );
};

const memoBecomeReduxFormInput = memoize(becomeReduxFormInput);

const renderLabel = (label, htmlId, isActive) => {
  if (label) {
    return (
      <Label htmlFor={htmlId} isActive={isActive}>
        {label}
      </Label>
    );
  }

  return <div style={{ height: '20px' }} />;
};

const Label = withTheme(styled.label`
  color: ${({ isActive, theme }) => (isActive ? theme.secondaryLabelColor(5) : theme.primaryLabelColor(5))};
  display: block;
  font-size: ${({ theme }) => theme.fontSize(5)};
`);

const FieldWrap = styled.div`
`

export default becomeField;
