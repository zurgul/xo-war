import React from 'react';
import PropTypes from 'prop-types';
import { getPossibleMoves, getScoreFunc } from '../utils/minmax';

class Brain extends React.Component {
    static propTypes = {
        board: PropTypes.array.isRequired,
        active: PropTypes.number.isRequired,
        aiPlayer: PropTypes.number.isRequired,
        onMove: PropTypes.func.isRequired
    };

    calcScore = getScoreFunc(3);

    componentDidMount() { this.componentWillReceiveProps(this.props) }

    componentWillReceiveProps({ board, active, aiPlayer, onMove }) {
        if (active !== aiPlayer) return null;

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

        onMove(moves[max.idx]);
    }

    shouldComponentUpdate() { return false }

    render() { return null }
}

export default Brain;
