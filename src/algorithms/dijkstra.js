function getAllNodes(nodesList) {
    const nodes = [];
    for (const row of nodesList) {
        for (const node of row) {
            nodes.push(node);
        };
    };
    return nodes;
};

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((firstNode, secondNode) => (firstNode.distance - secondNode.distance));
};

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
    
    return res.filter((node) => !node.isVisited);
};

function updateNeighbors(node, list) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, list);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
};

export default function dijkstraAlgorithm(nodesList, startNode, endNode) {
    startNode.distance = 0;
    const path = [];
    const unvisitedNodes = getAllNodes(nodesList);

    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        let closestNode = unvisitedNodes.shift();

        if (closestNode.isWall === true) {
            continue;
        };

        if (closestNode.distance === Infinity) {
            return path;
        };

        closestNode.isVisited = true;
        path.push(closestNode);

        if (closestNode === endNode) {
            return path;
        };
        updateNeighbors(closestNode, nodesList);
    };
};