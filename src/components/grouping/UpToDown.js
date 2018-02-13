import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: -${({ gap, theme }) => (gap !== undefined ? gap : theme.gap(5)) / 2}px;
  margin-bottom: -${({ gap, theme }) => (gap !== undefined ? gap : theme.gap(5)) / 2}px;
  > * {
    margin-top: ${({ gap, theme }) => (gap !== undefined ? gap : theme.gap(5)) / 2}px;
    margin-bottom: ${({ gap, theme }) => (gap !== undefined ? gap : theme.gap(5)) / 2}px;
  }
`;
