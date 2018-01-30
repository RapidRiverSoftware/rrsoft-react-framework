// @flow
import styled, { withTheme } from 'styled-components';

export default withTheme(styled.span`
  display: inline-block;
  padding: 0 5px;
  margin: 0 2px;
  line-height: 20px;
  color: ${({ primary, theme }) =>
    primary ? theme.primaryTagTextColor(5) : theme.secondaryTagTextColor(5)
  };
  background: ${({ primary, theme }) =>
    primary ? theme.primaryTagBgColor(5) : theme.secondaryTagBgColor(5)
  };
  cursor: pointer;
  &:first-child {
    margin-left: 0;
  }
`)
