import React from "react";
import {createNode, PAVnode} from "./components/PAVnode.js";
import PAVcanvas from "./components/PAVcanvas.js";
import NavBar from "./components/NavBar.js";
import dijkstraAlgorithm from "./algorithms/dijkstra.js";
import astarAlgorithm from "./algorithms/astar.js";

export default function App() {
    let featured_algorithm = "Dijkstra";
    const rows = (window.innerHeight / 20) / (1.5);
    const columns = ((window.innerWidth - 150) / 20);
    console.log(window.innerHeight, window.innerWidth);

    const [nodes, setNodes] = React.useState(createNodeList(rows, columns));
    const [mousePressed, setMouseState] = React.useState(false);

    function toggleWall(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        }
        newGrid[row][col] = newNode;
        return newGrid;
    };

    function handleMouseDown(row, col) {
        const newGrid = toggleWall(nodes, row, col);
        setMouseState(true);
        setNodes(newGrid);
    };

    function handleMouseHover(row, col) {
        if (mousePressed) {
            const newGrid = toggleWall(nodes, row, col);
            setNodes(newGrid);
        };
    };

    function handleMouseUp() {
        setMouseState(false);
    };

    function createNodeList(rows, columns) {
        let nodes = [];
        for (let i=0; i<rows; i++) {
            let subArray = [];
            for (let j=0; j<columns; j++) {
                const node = createNode(i, j);
                subArray.push(node);
            };
            nodes.push(subArray);
        };
        return nodes;
    };

    function animateAlgorithm(path, nodes, setNodes) {
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
            }, (25 * i));
        };
    };
    
    function visualizeDijkstra(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = dijkstraAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, setNodes);
    };

    function visualizeAstar(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = astarAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, setNodes);
    }

    // Algorithms selection function
    function selectAlgorithm(value) {
        featured_algorithm = value;
        console.log(featured_algorithm);
    };

    function visualizeSelectedAlgorithm() {
        if (featured_algorithm === "Dijkstra") {
            visualizeDijkstra(nodes, setNodes);
        }
        else if (featured_algorithm === "A*") {
            visualizeAstar(nodes, setNodes);
        }
    }

    // Function that clears walls and marked path nodes from the grid
    function clearGrid() {
        const newNodesList = createNodeList(rows, columns);
        setNodes(newNodesList);
    };

    // Function that clears marked path nodes from the grid but keeps wall nodes marked
    function clearPath() {
        const newNodesList = createNodeList(rows, columns);
        for (let i=0; i<rows; i++) {
            for (let j=0; j<columns; j++) {
                if (nodes[i][j].isWall) {
                    newNodesList[i][j].isWall = true;
                };
            };
        };
        setNodes(newNodesList);
    };

    return (
        <div className="app">
            <NavBar
                selectAlgorithm={selectAlgorithm}
                visualizeSelectedAlgorithm={() => visualizeSelectedAlgorithm()}
                clearGrid={clearGrid}
                clearPath={clearPath}
            />
            <PAVcanvas
                nodes={nodes}
                setNodes={setNodes}
                mousePressed={mousePressed}
                setMouseState={setMouseState}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseHover={handleMouseHover}
            />
        </div>
    );
};

// visualizeDijkstra(nodes, setNodes)