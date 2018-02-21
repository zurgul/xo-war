import { arrayToMatrix } from '../index';

const emptyNeighbor = { value: 1 };

const WIN = 100;

function scoreFn(board, player) {
    /**
     * 100 * average cluster size / number of clusters
     * eq to sum of tockens in clusters / number of clusters^2
     */
    const gb = arrayToMatrix(board);
    let top, left, topleft, neighbor;
    let groupId = 0;
    const groupSize = [];

    for (let r = 0; r < gb.length; r++) {
        for (let c = 0; c < gb.length; c++) {
            if (gb[r][c].value !== player) { continue }

            top = r > 0 ? gb[r - 1][c] : emptyNeighbor;
            left = c > 0 ? gb[r][c - 1] : emptyNeighbor;
            topleft = r > 0 && c > 0 ? gb[r - 1][c - 1] : emptyNeighbor;
            neighbor = top.value === player ? top : left.value === player ? left : topleft;

            if (neighbor.value === player) {
                gb[r][c].groupId = neighbor.groupId;
                groupSize[neighbor.groupId]++;
            } else {
                groupSize.push(1);
                gb[r][c].groupId = groupId++;
            }
        }
    }
    return groupSize.reduce((s, v) => (s + v), 0) / (groupSize.length * groupSize.length);
}

scoreFn.WIN = WIN;

export default scoreFn;