import { css } from 'emotion';

export const clearfix = css`
    &::after { 
       content: " ";
       display: block; 
       height: 0; 
       clear: both;
    }
`;
