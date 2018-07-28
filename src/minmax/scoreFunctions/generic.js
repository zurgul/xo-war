import { getOpponent } from '../index';
import * as state from '../../constants/cellStates';

const WIN = 1000;

// TODO
// worker thread(?)
// a-b pruning

const diagonals = [];
function calcDiagonals(winCount, sideLength) {
    // |
    for (let c = 0; c < sideLength; c++) {
        const d = []; // one diagonal
        for (let r = 0; r < sideLength; r++) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }

    // -
    for (let r = 0; r < sideLength; r++) {
        const d = [];
        for (let c = 0; c < sideLength; c++) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }

    // /, first half (top-left)
    for (let startCol = winCount - 1; startCol < sideLength; startCol++){
        const d = [];
        for(let c = startCol, r = 0; c >= 0; c--, r++) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }

    // /, second half (bottom-right)
    for (let startCol = 1; startCol <= sideLength - winCount; startCol++){
        const d = [];
        for(let c = startCol, r = sideLength - 1; c < sideLength; c++, r--) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }

    // \, first half (top-right)
    for (let startCol = 0; startCol <= sideLength - winCount; startCol++){
        const d = [];
        for(let c = startCol, r = 0; c < sideLength; c++, r++) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }

    // \, second half (bottom-left)
    for (let startCol = winCount - 1; startCol < sideLength - 1; startCol++){
        const d = [];
        for(let c = startCol, r = sideLength - 1; c >= 0; c--, r--) { d.push(r * sideLength + c) }
        diagonals.push(d);
    }
}

function scoreFn (winCount, sideLength) { 
    calcDiagonals(winCount, sideLength);
    const dLength = diagonals.length;
    function fn(board, player) {
        const opponent = getOpponent(player);
        const scores = new Array(dLength);
        // copy board, go for the first non-free - find diagonals, mark visited cell by 2^NumOfDiag
        // score += 1 << NumOfConnectedCells sum by every diagonal
        const b = [...board];
        const occupied = player + opponent;
        const right = 1 << 7;// we move from top-left to bottom-right => only three directions: right, down, down-right
        const down = 1 << 8;
        const downRight = 1 << 9;
        if (cell & occupied) {
            if (cell & right === 0){ 
                // go right
            }
            if (cell & down === 0){
                // go down
            }
            if (cell & downRight === 0){
                // go down-right
            }
        }

        return 0;
    }

    fn.WIN = WIN;
    return fn;
}

export default scoreFn;
