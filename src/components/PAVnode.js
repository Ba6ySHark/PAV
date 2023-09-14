export function PAVnode(props) {
    let classID = "node";
    if (props.node.isStart) {
        classID = "start";
    } else if (props.node.isEnd) {
        classID = "end";
    } else if (props.node.isMarked) {
        classID = "visited";
    } else if (props.node.isWall) {
        classID = "wall";
    };

    return (
        <div className={classID} 
            onMouseDown={() => props.onMouseDown(props.node.row, props.node.column)}
            onMouseEnter={() => props.onMouseEnter(props.node.row, props.node.column)}
            onMouseUp={() => props.onMouseUp()}
        ></div>
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
        isPartOfPath: false,
        previousNode: null,
        f_cost: 0,
        g_cost: 0,
        total_cost: 0,
        parent: null,
    };
};