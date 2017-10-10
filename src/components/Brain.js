import React from 'react';
import PropTypes from 'prop-types';
import { getPossibleMoves } from '../utils/minmax';

class Brain extends React.Component {
    static propTypes = {
        board: PropTypes.array.isRequired,
        active: PropTypes.number.isRequired,
        aiPlayer: PropTypes.number.isRequired,
        onMove: PropTypes.func.isRequired
    };

    componentDidMount() { this.componentWillReceiveProps(this.props) }

    componentWillReceiveProps({ board, active, aiPlayer, onMove }) {
        if (active !== aiPlayer) return null;

        const moves = getPossibleMoves(board);
        onMove(moves[Math.floor(Math.random() * moves.length)]);
    }

    shouldComponentUpdate() { return false }

    render() { return null }
}

export default Brain;
