import {PAVnode} from "./PAVnode.js";

export default function PAVcanvas(props) {
    return (
        <div className="canvas">
            {
                props.nodes.map((subNodeArray, rowId) => {
                    return (
                        <div key={rowId} className="line">
                            {subNodeArray.map((node, nodeId) => {
                                return <PAVnode
                                    key={nodeId}
                                    node={node}
                                    onMouseDown={() => props.handleMouseDown(node.row, node.column)}
                                    onMouseEnter={() => props.handleMouseHover(node.row, node.column)}
                                    onMouseUp={() => props.handleMouseUp()}
                                    />;
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
};