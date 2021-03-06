import React, { Children } from 'react';
import { css } from 'emotion';
import Cell from './Cell';
import { clearfix } from '../style/styleBase';

const style = css`
    display: inline-block;
`;

const Board = ({ children, className = '' }) => {
    const rowCount = Math.sqrt(Children.count(children)) << 0;
    return (
        <section className={`${style} ${className} ${clearfix}`}>
            {Children.map(children, (item, idx) => (
                <Cell isFirst={idx % rowCount === 0}>{item}</Cell>
            ))}
        </section>
    );
};

export default Board;
