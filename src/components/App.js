import React from 'react';
import { css } from 'emotion';
import Title from './Title';
import Board from './Board';
import { Base, Player1, Player2 } from './elements';
import * as state from '../constants/cellStates';
import Brain from './Brain';
import { getOpponent, getScoreFunc } from '../minmax';

const BOARD_SIZE = 3;
const WIN_COUNT = 3;
const DEPTH = 3;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.scoreFn = getScoreFunc(WIN_COUNT, BOARD_SIZE); // winCount

        this.state = {
            board: new Array(BOARD_SIZE * BOARD_SIZE).fill(state.FREE),
            active: state.PLAYER1,
            aiPlayer: state.PLAYER2,
            winner: undefined
        };
    }

    recordMove = idx => {
        const { board, active, winner } = this.state;
        if (board[idx] !== state.FREE || winner) return;

        const nextBoard = [...board];
        nextBoard[idx] = active;

        let nextActive = getOpponent(active);
        let nextWinner;

        if (this.scoreFn(nextBoard, active) >= this.scoreFn.WIN) {
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
                <Title>{winner ? (winner === aiPlayer ? 'You lost' : 'You won') : 'Game time'}</Title>
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
                    ? <Brain {...{ board, active, aiPlayer, depth: DEPTH }} onMove={this.recordMove} scoreFn={this.scoreFn} />
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
