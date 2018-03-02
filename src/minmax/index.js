import * as state from '../constants/cellStates';
import * as scoreFn from './scoreFunctions';

/**
 * Receive board state as an array and returns an array of unoccupied cells
 * @param board single dimension array with current board state
 * @return indexes of unoccupied cells
 */
export const getPossibleMoves = board => {
    const indexes = [];
    for (let i = board.length; i--;) {
        if (board[i] === state.FREE) { indexes.push(i) }
    }
    return indexes;
};

/**
 * Returns score function to estimate position quality
 * @param winCount - how many tokens in line is required to win
 * @param type - name of score function if more than one available
 * @return {function(board, player, [winCount])} score function
 */
export const getScoreFunc = (winCount, sideLength, type = 'naive') => scoreFn[type](winCount, sideLength);

export const getOpponent = player => player === state.PLAYER1 ? state.PLAYER2 : state.PLAYER1;

export const getMinMax = (scoreFn, aiPlayer) => {
    const opponent = getOpponent(aiPlayer);
    const minmax = (board, depth, isMaxPlayer) => {
        const moves = getPossibleMoves(board);

        const score = scoreFn(board, aiPlayer);
        if (score >= scoreFn.WIN || depth === 0 || moves.length < 2) {
            return score;
        }

        const boards = moves.map(idx => {
            const newBoard = [...board];
            newBoard[idx] = isMaxPlayer ? aiPlayer : opponent;
            return newBoard;
        });

        if (isMaxPlayer) {
            const scores = boards.map(b => minmax(b, depth - 1, false));
            return Math.max(...scores);
        } else {
            const scores = boards.map(b => minmax(b, depth - 1, true));
            return Math.min(...scores);
        }
    };
    return minmax;
};

export const arrayToMatrix = array => {
    const size = Math.sqrt(array.length);
    let r = 0, c = 0;
    return array.reduce((acc, value) => {
        if (c === 0) { acc.push([]) }
        acc[r].push({ value });
        if (++c === size) { r++; c = 0 }
        return acc;
    }, []);
};
