export function PAVnode(props) {
    let classID = "node";
    if (props.node.isStart) {
        classID = "node start";
    } else if (props.node.isEnd) {
        classID = "node end";
    } else if (props.node.isPath) {
        classID = "path";
    } else if (props.node.isMarked) {
        classID = "visited";
    } else if (props.node.isWall) {
        classID = "wall";
    }

    return (
        <div className={classID} 
            onMouseDown={() => props.onMouseDown(props.node.row, props.node.column)}
            onMouseEnter={() => props.onMouseEnter(props.node.row, props.node.column)}
            onMouseUp={() => props.onMouseUp()}
        ></div>
    );
}

export function createNode(row, col, startRow = 8, startCol = 10, endRow = 8, endCol = 40) {
    return {
        row: row,
        column: col,
        isStart: row === startRow && col === startCol,
        isEnd: row === endRow && col === endCol,
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
}