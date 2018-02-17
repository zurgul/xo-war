import React from 'react';
import PropTypes from 'prop-types';
import { getPossibleMoves, getScoreFunc, getMinMax } from '../minmax';

class Brain extends React.Component {
    static propTypes = {
        board: PropTypes.array.isRequired,
        active: PropTypes.number.isRequired,
        aiPlayer: PropTypes.number.isRequired,
        onMove: PropTypes.func.isRequired
    };

    scoreFn = getScoreFunc(3);

    calcMove = (board, aiPlayer) => {
        const moves = getPossibleMoves(board);
        const boards = moves.map(idx => {
            const newBoard = [...board];
            newBoard[idx] = aiPlayer;
            return newBoard;
        });

        const scores = boards.map(b => this.minmax(b, 3, false));
        const max = Math.max(...scores);

        // console.log(moves.join(', '));
        // console.log(scores.join(', '));

        return moves[scores.indexOf(max)];
    };

    componentDidMount() { this.componentWillReceiveProps(this.props) }

    componentWillReceiveProps({ board, active, aiPlayer, onMove }) {
        if (active !== aiPlayer) { return null }
        this.minmax = getMinMax(this.scoreFn, aiPlayer);
        onMove(this.calcMove(board, aiPlayer));
    }

    shouldComponentUpdate() { return false }

    render() { return null }
}

export default Brain;
