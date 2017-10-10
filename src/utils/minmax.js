import * as state from './cellStates';

/**
 * Receive board state as an array and returns an array of unoccupied cells
 * @param board single dimension array with current board state
 * @return indexes of unoccupied cells
 */
export const getPossibleMoves = (board) => {
    const indexes = [];
    let idx = board.length;
    while(idx--) {
        if (board[idx] === state.FREE) indexes.push(idx);
    }
    return indexes;
};

/**
 * Returns score function to estimate position quality
 * @param winCount - how many tockens in line is required to win
 * @param type - name of score function if more than one available
 * @return {function(board, player)} score function
 */
export const getScoreFunc = (winCount, type) => {
    const basicScore = (board, player) => {
        /**
         * sums up all unlocked chains of player's tockens
         * a longer chain gives extra score
         * e.g. 1 tocken - 1sc, 2 tockens - ...
          */
    };
    return basicScore;
};
