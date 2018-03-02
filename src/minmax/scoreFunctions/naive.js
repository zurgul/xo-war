import { arrayToMatrix, getOpponent } from '../index';
import * as state from '../../constants/cellStates';

const WIN = 1000;
const enoughToWin = 900;

function scoreFn (winCount, sideLength) { 
    function fn(board, player) {
        const b = arrayToMatrix(board);
        const opponent = getOpponent(player);
        let score = 0;

        function getUpdateScoreFn () {
            let pEmpty = 0, oEmpty = 0;
            let pOwn = 0, oOwn = 0;
            let emptyAfterPlayer = false;
            let emptyAfterOpponent = false;

            const inLineScore = value => {
                switch (value) {
                    case state.FREE: 
                        pEmpty++;
                        oEmpty++ 
                        emptyAfterPlayer = pOwn > 0;
                        emptyAfterOpponent = oOwn > 0;
                        break;
                    case player:
                        if (emptyAfterPlayer) { emptyAfterPlayer = false; pOwn = 0; }
                        pOwn++;
                        if (oOwn + oEmpty >= winCount) { score -= (oOwn >= winCount ? WIN << 1 : oOwn) }
                        [oEmpty, oOwn] = [0, 0];
                        break;
                    case opponent:
                        if (emptyAfterOpponent) { emptyAfterOpponent = false; oOwn = 0; }
                        oOwn++;
                        if (pOwn + pEmpty >= winCount) { score += (pOwn >= winCount ? WIN : pOwn) }
                        [pEmpty, pOwn] = [0, 0];
                        break;
                }
            };
            const endLineScore = () => {
                if (pOwn + pEmpty >= winCount) { score += (pOwn >= winCount ? WIN : pOwn) }
                if (oOwn + oEmpty >= winCount) { score -= (oOwn >= winCount ? WIN << 1 : oOwn) }
            };
            return [inLineScore, endLineScore];
        }

        // |
        for (let c = 0; c < sideLength; c++) {
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for (let r = 0; r < sideLength; r++) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        if (Math.abs(score) >= enoughToWin) return score << 1;

        // -
        for (let r = 0; r < sideLength; r++) {
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for (let c = 0; c < sideLength; c++) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        if (Math.abs(score) >= enoughToWin) return score << 1;

        // /, first half (top-left)
        for (let startCol = winCount - 1; startCol < sideLength; startCol++){
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for(let c = startCol, r = 0; c >= 0; c--, r++) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        if (Math.abs(score) >= enoughToWin) return score << 1;

        // /, second half (bottom-right)
        for (let startCol = 1; startCol <= sideLength - winCount; startCol++){
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for(let c = startCol, r = sideLength - 1; c < sideLength; c++, r--) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        if (Math.abs(score) >= enoughToWin) return score << 1;

        // \, first half (top-right)
        for (let startCol = 0; startCol <= sideLength - winCount; startCol++){
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for(let c = startCol, r = 0; c < sideLength; c++, r++) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        if (Math.abs(score) >= enoughToWin) return score << 1;

        // \, second half (bottom-left)
        for (let startCol = winCount - 1; startCol < sideLength - 1; startCol++){
            const [inLineScore, endLineScore] = getUpdateScoreFn();
            for(let c = startCol, r = sideLength - 1; c >= 0; c--, r--) {
                inLineScore(b[r][c].value);
            }
            endLineScore();
        }
        // console.log(`player ${player}, score ${score}`);
        return Math.abs(score) >= enoughToWin ? score << 1 : score;
    }
    fn.WIN = WIN;
    return fn;
}

export default scoreFn;