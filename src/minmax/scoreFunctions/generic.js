import { arrayToMatrix, getOpponent } from '../index';
import * as state from '../../constants/cellStates';

const WIN = 1000;
const enoughToWin = 900;

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

        // const pScores = new Array(dLength);//d.map(i => ((b[i[0]] & player) + (b[i[1]] & player) + (b[i[2]] & player)) / player);
        // const oScores = new Array(dLength);//d.map(i => ((b[i[0]] & other) + (b[i[1]] & other) + (b[i[2]] & other)) / other);
        const scores = new Array(dLength);
        for(let di = 0; di < diagonals.length; di++) {
            scores[di] = diagonals[di].reduce((acc, v) => {
                acc[board[v]]++;
                return acc;
            }, [0, 0, 0, 0, 0]); // 1 empty, 2 player1, 4 player2
            
            scores[di][player] /= player; // normalization
            scores[di][opponent] /= opponent;

            if (scores[di][player] + scores[di][state.FREE] > winCount);
        }

        // const pScores = playerScores.map((v, i) => otherScores[i] ? 0 : playerScores[i]);
        // const oScores = playerScores.map((v, i) => playerScores[i] ? 0 : otherScores[i]);

        // if (oScores.some(v => v === 3)) return -WIN;
        // if (pScores.some(v => v === 3)) return WIN;

        return pScores.reduce((acc, v, i) => acc + v - oScores[i], 0);
    }

    fn.WIN = WIN;
    return fn;
}

export default scoreFn;