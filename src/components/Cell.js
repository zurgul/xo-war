import styled from 'react-emotion';

export default styled('div')`
  display: inline-block;
  float: left;
  ${p => p.isFirst ? 'clear: left;' : ''}
  text-align: center;
  margin: 0.5em;
  padding: 0;
`;
