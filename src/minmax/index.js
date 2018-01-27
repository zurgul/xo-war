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
export const getScoreFunc = (winCount, type = 'naive') => scoreFn[type];

export const getOpponent = player => player === state.PLAYER1 ? state.PLAYER2 : state.PLAYER1;

/**
 * 
 */
export const getMinMax = (scoreFn, aiPlayer) => {
    const minmax = (board, depth, isMaxPlayer) => {
        const moves = getPossibleMoves(board);

        if (depth === 0 || moves.length < 2) {
            return scoreFn(board, aiPlayer);
        }

        const boards = moves.map(idx => {
            const newBoard = [...board];
            newBoard[idx] = isMaxPlayer ? aiPlayer : getOpponent(aiPlayer);
            return newBoard;
        });

        if (isMaxPlayer) {
            const scores = boards.map(b => minmax(b, depth - 1, false));
            return Math.max(...scores);
        } else {
            const scores = boards.map(b => minmax(b, depth - 1, true));
            return Math.min(...scores);
        }

        //     if depth = 0 or board is a terminal board
        //         return the heuristic value of board
        //     if isMaxPlayer
        //         bestValue := −∞
        //         for each child of board
        //             v := minimax(child, depth − 1, false)
        //             bestValue := max(bestValue, v)
        //         return bestValue
        //     else    (* minimizing player *)
        //         bestValue := +∞
        //         for each child of board
        //             v := minimax(child, depth − 1, true)
        //             bestValue := min(bestValue, v)
        //         return bestValue
    };
    return minmax;
};

export const arrayToMatrix = array => {
    const size = Math.sqrt(array.length);
    let r = 0, c = 0, i = size;
    return array.reduce((acc, value) => {
        if (c === 0) { acc.push([]) }
        acc[r].push({ value });
        if (++c === size) { r++; c = 0 }
        return acc;
    }, []);
};
