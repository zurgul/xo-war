import styled from 'react-emotion';

export const size = '64px';

export default styled('div')`
    width: ${size};
    height: ${size};
    line-height: ${size};
    background-color: wheat;
    &:hover {
        background-color: ${p => p.children ? '#D1C378' : 'darkseagreen'};
    }
`;
