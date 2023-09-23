export default function createRandomMaze(nodes) {
    const newNodes = nodes.slice();
    for (let i=0; i<nodes.length; i++) {
        for (let j=0; j<nodes[i].length; j++) {
            const randomValue = Math.floor(Math.random() * 10);
            if (randomValue < 3) {
                newNodes[i][j].isWall = true;
            }
            else {
                continue;
            }
        }
    }
    return newNodes;
}