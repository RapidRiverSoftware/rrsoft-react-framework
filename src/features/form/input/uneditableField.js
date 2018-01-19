import React from 'react';
import styled from 'styled-components';
import { weight, font, color } from '../../../../style/config';

const UneditableField = ({ label, input }) => (
    <div>
      <Label> {label} </Label>
      <UneditableInput> {input} </UneditableInput>
    </div>
  );

const Label = styled.label`
  color: ${color.lightNeutral};
  font-weight: ${weight.bold};
  display: block;
  font-size: ${font.xsmall};
  margin-bottom: 0px;
`;

const UneditableInput = styled.span`
  box-sizing: border-box;
  font-size: ${font.large};
  font-weight: ${weight.normal};
  width: 100%;
  color: black;
  padding: 0 10px;
  line-height: 19px;
  margin-top: 0px;
  outline: 0;
  background-color: transparent;
`;

export default UneditableField;
