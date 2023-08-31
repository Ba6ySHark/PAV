export function PAVnode(props) {
    let classID = "node";
    if (props.node.isStart) {
        classID = "start";
    } else if (props.node.isEnd) {
        classID = "end";
    } else if (props.node.isMarked) {
        classID = "visited";
    };

    return (
        <div className={classID}></div>
    );
};

export function createNode(row, col) {
    return {
        row: row,
        column: col,
        isStart: row === 8 && col === 10,
        isEnd: row === 8 && col === 40,
        distance: Infinity,
        isWall: false,
        isVisited: false,
        isMarked: false,
        previousNode: null,
    };
};