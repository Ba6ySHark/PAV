export default function createRandomMaze(nodes, startNode, endNode) {
    const newNodes = nodes.slice();
    for (let i=0; i<nodes.length; i++) {
        for (let j=0; j<nodes[i].length; j++) {
            newNodes[i][j] = {
                ...newNodes[i][j],
                distance: Infinity,
                isWall: false,
                isVisited: false,
                isMarked: false,
                isPath: false,
                f_cost: 0,
                g_cost: 0,
                total_cost: 0,
                parent: null,
            }
            const randomValue = Math.floor(Math.random() * 10);
            if (randomValue < 3 && (newNodes[i][j] !== startNode) && (newNodes[i][j] !== endNode)) {
                newNodes[i][j].isWall = true;
            }
            else {
                continue;
            }
        }
    }
    return newNodes;
}