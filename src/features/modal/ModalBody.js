import styled from 'styled-components';

export default styled.div`
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  padding-bottom: ${({ hideBottomButtons }) => (hideBottomButtons ? '0px' : '80px')};
`;
