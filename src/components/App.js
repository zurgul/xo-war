import React from 'react';
import { css } from 'emotion';
import Title from './Title';

class App extends React.Component {
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

export default App;
