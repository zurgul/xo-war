import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Board from './Board';
import { Base, Player1, Player2 } from './elements';
import * as states from '../utils/cellStates';
import Brain from './Brain';

class App extends React.Component {
    constructor(props) {
        super(props);

        const initialSize = 3;
        this.state = {
            board: new Array(initialSize * initialSize).fill(states.FREE),
            size: initialSize,
            active: states.PLAYER1,
            aiPlayer: states.PLAYER1
        };
    }

    recordMove = idx => {
        const board = this.state.board;
        if (board[idx] !== states.FREE) return;

        const nextBoard = [...this.state.board];
        nextBoard[idx] = this.state.active;

        this.setState({
            board: nextBoard,
            active: this.state.active === states.PLAYER1 ? states.PLAYER2 : states.PLAYER1
        });
    };

    handleCellClick = e => {
        this.recordMove(e.currentTarget.dataset['index']);
    };

    render() {
        const { board, active, aiPlayer } = this.state;
        return (
            <section className={css`text-align: center;`}>
                <Title>test title</Title>
                <Board>
                    {board.map((cell, idx) => React.createElement(
                        cells[cell],
                        {
                            key: idx,
                            'data-index': idx,
                            onClick: this.handleCellClick
                        })
                    )}
                </Board>
                { aiPlayer
                    ? <Brain {...{ board, active, aiPlayer }} onMove={this.recordMove} />
                    : null }
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
