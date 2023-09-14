function getUnvisitedNeighbors(node, list) {
    const res = [];
    const {row, column} = node;

    if (row > 0) {
        res.push(list[row - 1][column]);
    };

    if (column < list[0].length - 1) {
        res.push(list[row][column + 1]);
    };

    if (row < list.length - 1) {
        res.push(list[row + 1][column]);
    };

    if (column > 0) {
        res.push(list[row][column - 1]);
    };
    
    return res.filter((node) => (!node.isVisited && !node.isWall));
}

export default function dfsAlgorithm(nodes, startNode, endNode) {
    startNode.isVisited = true;
    let unvisitedStack = [startNode];
    const visited = [];

    while (unvisitedStack.length > 0) {
        const current = unvisitedStack.shift();
        current.isVisited = true;

        if (current === endNode) {
            return visited;
        }

        const children = getUnvisitedNeighbors(current, nodes);
        // for (const child of children) {
        //     child.isVisited = true;
        // }

        unvisitedStack = children.concat(unvisitedStack);
        visited.push(current);
    }
}