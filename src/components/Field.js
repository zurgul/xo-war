import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

class Field extends React.PureComponent {
    render() {
        const rcount = Math.ceil(Math.sqrt(Children.count(this.props.children)));
        return (
            <section>
                {Children.map(this.props.children, (item, idx) => (
                    <Cell isFirst={idx % rcount === 0}>{item}</Cell>
                ))}
            </section>
        );
    }
}

export default Field;
