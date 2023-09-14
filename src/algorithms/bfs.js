function getUnvisitedNeighbors(node, list) {
    const res = [];
    const {row, column} = node;

    if (row > 0) {
        res.push(list[row - 1][column]);
    };

    if (row < list.length - 1) {
        res.push(list[row + 1][column]);
    };

    if (column > 0) {
        res.push(list[row][column - 1]);
    };

    if (column < list[0].length - 1) {
        res.push(list[row][column + 1]);
    };
    
    return res.filter((node) => (!node.isVisited && !node.isWall));
}

export default function bfsAlgorithm(nodes, startNode, endNode) {
    startNode.visited = true;
    const queue = [startNode];
    const res = [];

    while (queue.length > 0) {
        const current = queue[0];

        if (current == endNode) {
            return res;
        }

        const children = getUnvisitedNeighbors(current, nodes);
        for (let child of children) {
            child.isVisited = true;
            child.parent = current;
            queue.push(child);
        }

        res.push(current);
        queue.shift();
    }
}