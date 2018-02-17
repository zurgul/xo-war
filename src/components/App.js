import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Board from './Board';
import { Base, Player1, Player2 } from './elements';
import * as state from '../constants/cellStates';
import Brain from './Brain';
import { getOpponent } from '../minmax';

class App extends React.Component {
    constructor(props) {
        super(props);

        const initialSize = 3;
        this.state = {
            board: new Array(initialSize * initialSize).fill(state.FREE),
            size: initialSize,
            active: state.PLAYER1,
            aiPlayer: state.PLAYER2
        };
    }

    recordMove = idx => {
        const { board, active } = this.state;
        if (board[idx] !== state.FREE) return;

        const nextBoard = [...board];
        nextBoard[idx] = active;

        this.setState({
            board: nextBoard,
            active: getOpponent(active)
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
    [state.FREE]: Base,
    [state.PLAYER1]: Player1,
    [state.PLAYER2]: Player2,
};

export default App;
