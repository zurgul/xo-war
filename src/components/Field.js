import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Title from './Title';

class Field extends React.Component {
    static propTypes = {
        size: PropTypes.number
    };
    render() {
        return (
            <section className={css`
                margin: 10px auto;
                background-color: wheat;
            `}>
                <Title>test title</Title>
            </section>
        );
    }
}

export default Field;
