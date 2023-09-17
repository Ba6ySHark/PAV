// This function computes grid's heuristic
// It only allows movement in 4 directions (up, down, left, rigth)
function manhattanDistance(currentNode, goalNode) {
    return Math.abs(currentNode.row - goalNode.row) + Math.abs(currentNode.column - goalNode.column);
}

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
    
    return res.filter((node) => !node.isWall);
}

function isInOpenSet(node, openSet) {
    for (const element of openSet) {
        if ((node.row == element.row) && (node.column == element.column) && (node.total_cost >= element.total_cost)) {
            return true;
        }
    }
    return false;
}

function isInClosedSet(node, closedSet) {
    for (const element of closedSet) {
        if ((node.row == element.row) && (node.column == element.column) && (node.total_cost >= element.total_cost)) {
            return true;
        }
    }
    return false;
}

export default function astarAlgorithm(nodes, startNode, endNode) {
    startNode.f_cost = 0;
    startNode.g_cost = 0;
    startNode.total_cost = 0;
    const openSet = [startNode];
    const closedSet = [];
    const path = [];

    while (openSet.length > 0) {
        //console.log(openSet);
        openSet.sort((firstNode, secondNode) => (firstNode.total_cost - secondNode.total_cost));
        let current = openSet.shift();
        let childNodes = getUnvisitedNeighbors(current, nodes);

        for (const child of childNodes) {
            if (child == endNode) {
                endNode.parent = current;
                closedSet.push(current);
                return closedSet;
            }
            else {
                //child.isMarked = true;
                child.f_cost = current.f_cost + 0.25;
                child.g_cost = manhattanDistance(child, endNode);
                child.total_cost = child.f_cost + child.g_cost;

                if (isInOpenSet(child, openSet)) {
                    continue;
                }

                if (isInClosedSet(child, closedSet)) {
                    continue;
                }
                else {
                    child.parent = current;
                    openSet.push(child);
                    path.push(child);
                }
            }
        }

        closedSet.push(current);
    }
}