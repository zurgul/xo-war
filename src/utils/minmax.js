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
         * 100 * average cluster size / number of clusters
         * eq to sum of tockens in clusters / number of clusters^2
         */
        const gb = arrayToMatrix(board);

    };
    return basicScore;
};

/**
 * 
 */
export const minmax = (board, depth, isMaxPlayer) => {
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
