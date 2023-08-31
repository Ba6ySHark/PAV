import React from "react";
import "../App.css";
import {createNode, PAVnode} from "./PAVnode.js";
import dijkstraAlgorithm from "../algorithms/dijkstra";

function createNodeList(rows, columns) {
    let nodes = [];
    for (let i=0; i<rows; i++) {
        let subArray = [];
        for (let j=0; j<columns; j++) {
            subArray.push(createNode(i, j));
        };
        nodes.push(subArray);
    };
    return nodes;
};

function createCanvas(nodesList) {
    const nodes = nodesList.map((subNodeArray, rowId) => {
        return (
            <div key={rowId} className="line">
                {subNodeArray.map((node, nodeId) => {
                    return <PAVnode key={nodeId} node={node} />;
                })}
            </div>
        );
    });
    return nodes;
};

export default function PAVcanvas() {
    const rows = 15;
    const columns = 50;

    const [nodes, setNodes] = React.useState(createNodeList(rows, columns));
    //const [nodesToRender, setNodesToRender]= React.useState(createCanvas(nodes));

    function animateDijkstra(path) {
        for (let i=0; i<path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                const newList = nodes.slice();
                const newNode = {
                    ...node,
                    isMarked: true,
                };
                newList[node.row][node.column] = newNode;
                setNodes(newList);
                console.log(newList);
            }, (50 * i));
        };
    };
    
    function visualizeDijkstra(nodesList) {
        const startNode = nodesList[8][10];
        const endNode = nodesList[8][40];
        const path = dijkstraAlgorithm(nodesList, startNode, endNode);
        animateDijkstra(path);
    };

    return (
        <div className="canvas">
            <button className="algo--button" onClick={() => visualizeDijkstra(nodes, setNodes)}>Visualize</button>
            {
                nodes.map((subNodeArray, rowId) => {
                    return (
                        <div key={rowId} className="line">
                            {subNodeArray.map((node, nodeId) => {
                                return <PAVnode key={nodeId} node={node} />;
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
};