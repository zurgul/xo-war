import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Board from './Board';
import { Base, Player1, Player2 } from './elements';
import * as state from '../constants/cellStates';
import Brain from './Brain';
import { getOpponent, getScoreFunc } from '../minmax';

class App extends React.Component {
    constructor(props) {
        super(props);

        const initialSize = 3;
        this.scoreFn = getScoreFunc(initialSize);

        this.state = {
            board: new Array(initialSize * initialSize).fill(state.FREE),
            size: initialSize,
            active: state.PLAYER1,
            aiPlayer: state.PLAYER2,
            winner: undefined
        };
    }

    recordMove = idx => {
        const { board, active, size, winner } = this.state;
        if (board[idx] !== state.FREE || winner) return;

        const nextBoard = [...board];
        nextBoard[idx] = active;

        let nextActive = getOpponent(active);
        let nextWinner;

        if (this.scoreFn(nextBoard, active, size) === this.scoreFn.WIN) {
            nextWinner = active;
            nextActive = active + nextActive; // to turn off 'brain'
        }

        this.setState({
            board: nextBoard,
            active: nextActive,
            winner: nextWinner
        });
    };

    handleCellClick = e => {
        this.recordMove(e.currentTarget.dataset['index']);
    };

    render() {
        const { board, active, aiPlayer, winner } = this.state;
        return (
            <section className={css`text-align: center;`}>
                <Title>{winner ? (winner === active ? 'You won' : 'You lost') : 'Game time'}</Title>
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
