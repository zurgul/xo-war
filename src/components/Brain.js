import React from 'react';
import PropTypes from 'prop-types';
import { getPossibleMoves, getScoreFunc } from '../minmax';

class Brain extends React.Component {
    static propTypes = {
        board: PropTypes.array.isRequired,
        active: PropTypes.number.isRequired,
        aiPlayer: PropTypes.number.isRequired,
        onMove: PropTypes.func.isRequired
    };

    calcScore = getScoreFunc(3);

    calcMove = (board, aiPlayer) => {
        const moves = getPossibleMoves(board);
        const boards = moves.map(idx => {
            const newBoard = [...board];
            newBoard[idx] = aiPlayer;
            return newBoard;
        });
        const scores = boards.map(b => this.calcScore(b, aiPlayer));

        const max = scores.reduce(
            (max, score, idx) => max.score < score ? { score, idx } : max,
            { score: -100, idx: undefined });

        return moves[max.idx];
    };

    componentDidMount() { this.componentWillReceiveProps(this.props) }

    componentWillReceiveProps({ board, active, aiPlayer, onMove }) {
        if (active !== aiPlayer) { return null }
        onMove(this.calcMove(board, aiPlayer));
    }

    shouldComponentUpdate() { return false }

    render() { return null }
}

export default Brain;
