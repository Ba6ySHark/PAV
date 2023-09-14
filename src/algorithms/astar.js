// This function computes grid's heuristic
// It only allows movement in 4 directions (up, down, left, rigth)
function manhattanDistance(currentNode, goalNode) {
    return Math.abs(currentNode.row - goalNode.row) + Math.abs(currentNode.column - goalNode.column);
}

export default function astarAlgorithm(nodes, startNode, endNode) {
    const openSet = new Set([startNode]);
    const cameFrom = new Map();


}