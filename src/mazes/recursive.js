export default function createRecursiveMaze(nodes, startNode, endNode) {
    function recursiveMaze(rows, columns, startNode, endNode, orientation) {
        if ((rows[1] - rows[0]) < 2 || (columns[1] - columns[0]) < 2) {
            return;
        }
        else {
            if (orientation === "horizontal") {
                const newRow = Math.floor((rows[1] + rows[0]) / 2);
                let flag = false;
                for (let j=columns[0]; j<columns[1]; j++) {
                    if (!newNodes[newRow][j].isStart && !newNodes[newRow][j].isEnd) {
                        newNodes[newRow][j].isWall = true;
                    }
                    if (flag === false && Math.floor(Math.random() * 100) > 17) {
                        newNodes[newRow][j].isWall = false;
                        flag = true;
                    }
                }
                recursiveMaze([rows[0], newRow - 1], columns, startNode, endNode, "vertical");
                recursiveMaze([newRow + 1, rows[1]], columns, startNode, endNode, Math.floor(Math.random() * 10) > 3 ? "vertical" : "horizontal");
            }
            else {
                const newColumn = Math.floor((columns[1] + columns[0]) / 2);
                let flag = false;
                for (let i=rows[0]; i<rows[1]; i++) {
                    if (!newNodes[i][newColumn].isStart && !newNodes[i][newColumn].isEnd) {
                        newNodes[i][newColumn].isWall = true;
                    }
                    if (flag === false && Math.floor(Math.random() * 100) > 17) {
                        newNodes[i][newColumn].isWall = false;
                        flag = true;
                    }
                }
                recursiveMaze(rows, [columns[0], newColumn - 1], startNode, endNode, "verical");
                recursiveMaze(rows, [newColumn + 1, columns[1]], startNode, endNode, "horizontal");
            }
        }
    }

    let newNodes = nodes.slice();
    recursiveMaze([0, newNodes.length], [0, newNodes[0].length], startNode, endNode, "horizontal");
    return newNodes;
}