import React from 'react';
import {css, injectGlobal, fontFace} from 'emotion';
import Title from './Title';

fontFace`
  font-family: 'Oxygen'
  font-style: normal
  font-weight: 400
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2')
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215
`;
injectGlobal`
  html,body{
    font-family: 'Oxygen'
  }
`;

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
