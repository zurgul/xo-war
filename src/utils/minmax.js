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
        let top, left, topleft, neighbor;
        let groupId = 0;
        const groupSize = [];
        const emptyNeighbor = { value: 1 };

        for (let r = 0; r < gb.length; r++) {
            for (let c = 0; c < gb.length; c++) {
                if (gb[r][c].value !== player) { continue }

                top = r > 0 ? gb[r - 1][c] : {};
                left = c > 0 ? gb[r][c - 1] : emptyNeighbor;
                topleft = r > 0 && c > 0 ? gb[r - 1][c - 1] : emptyNeighbor;
                neighbor = left || top || topleft;

                if (neighbor.value === player) {
                    gb[r][c].groupId = neighbor.groupId;
                    groupSize[neighbor.groupId]++;
                }
                else {
                    groupSize.push(1);
                    gb[r][c].groupId = groupId++;
                }
            }
        }

        return groupSize.reduce((s, v) => (s + v), 0) / (groupSize.length * groupSize.length);
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
