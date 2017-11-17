import { arrayToMatrix } from '../index';

const emptyNeighbor = { value: 1 };

export default function (board, player, winCount) {
    /**
     * 100 * average cluster size / number of clusters
     * eq to sum of tockens in clusters / number of clusters^2
     */
    const gb = arrayToMatrix(board);
    let top, left, topleft, neighbor;

    for (let r = 0; r < gb.length; r++) {
        for (let c = 0; c < gb.length; c++) {
            if (gb[r][c].value !== player) { continue }

            top = r > 0 ? gb[r - 1][c] : {};
            left = c > 0 ? gb[r][c - 1] : emptyNeighbor;
            topleft = r > 0 && c > 0 ? gb[r - 1][c - 1] : emptyNeighbor;
            neighbor = left || top || topleft;
        }
    }
    return null;
}
