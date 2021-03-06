import { getOpponent } from '../index';

const d = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], // 'diagonals'
           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const WIN = 100;

/**
 * trivial score function for tic-tac-toe 3x3
 */
function scoreFn () { 
    function fn(b, player) {
        const other = getOpponent(player);

        const playerScores = d.map(i => ((b[i[0]] & player) + (b[i[1]] & player) + (b[i[2]] & player)) / player);
        const otherScores = d.map(i => ((b[i[0]] & other) + (b[i[1]] & other) + (b[i[2]] & other)) / other);

        const pScores = playerScores.map((v, i) => otherScores[i] ? 0 : playerScores[i]);
        const oScores = playerScores.map((v, i) => playerScores[i] ? 0 : otherScores[i]);

        if (oScores.some(v => v === 3)) return -WIN;
        if (pScores.some(v => v === 3)) return WIN;

        return pScores.reduce((acc, v, i) => acc + v - oScores[i], 0);
    }
    fn.WIN = WIN;
    return fn;
}

export default scoreFn;