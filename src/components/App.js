import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Field from './Field';

class App extends React.Component {
    render() {
        return (
            <section className={css`
                margin: 10px auto;
                background-color: wheat;
            `}>
                <Title>test title</Title>
                <Field>
                    <span>a</span>
                    <span>b</span>
                    <span>c</span>
                    <span>d</span>
                </Field>
            </section>
        );
    }
}

export default App;
