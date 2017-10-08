import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Board from './Board';
import { Base, Player1, Player2 } from './elements';
import * as states from '../utils/cellStates';

class App extends React.Component {
    constructor(props) {
        super(props);

        const initialSize = 5;
        this.state = {
            board: new Array(initialSize * initialSize).fill(states.FREE),
            size: initialSize,
            active: states.PLAYER1,
            moves: [],
        };
    }

    recordMove = e => {
        const idx = e.currentTarget.dataset['index'];
        const board = this.state.board;
        if (board[idx] !== states.FREE) return;

        const nextBoard = [...this.state.board];
        nextBoard[idx] = this.state.active;

        this.setState({
            board: nextBoard,
            active: this.state.active === states.PLAYER1 ? states.PLAYER2 : states.PLAYER1
        });
    };

    render() {
        return (
            <section className={css`
                text-align: center;
            `}>
                <Title>test title</Title>
                <Board>
                    {this.state.board.map((cell, idx) => React.createElement(
                        cells[cell],
                        {
                            key: idx,
                            'data-index': idx,
                            onClick: this.recordMove
                        })
                    )}
                </Board>
            </section>
        );
    }
}

const cells = {
    [states.FREE]: Base,
    [states.PLAYER1]: Player1,
    [states.PLAYER2]: Player2,
};

export default App;
