import React from "react";

import {createNode, PAVnode} from "./components/PAVnode.js";
import PAVcanvas from "./components/PAVcanvas.js";
import NavBar from "./components/NavBar.js";

import dijkstraAlgorithm from "./algorithms/dijkstra.js";
import astarAlgorithm from "./algorithms/astar.js";
import bfsAlgorithm from "./algorithms/bfs.js";
import dfsAlgorithm from "./algorithms/dfs.js";

import createRandomMaze from "./mazes/random.js";
import createRecursiveMaze from "./mazes/recursive.js";
import Description from "./components/Description.js";

export default function App() {
    let [featured_algorithm, setFeaturedAlgorithm] = React.useState("Dijkstra");
    let [animationSpeed, setAnimationSpeed] = React.useState(25); // in ms (fast by default)

    const rows = (window.innerHeight / 25) / (1.5);
    const columns = ((window.screen.width - 150) / 25);

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

    function createPath(endNode) {
        const path = [];
        let node = {
            ...endNode,
        }
        while (node.parent != null) {
            const newNode = {
                ...node.parent
            }
            path.push(newNode);
            node = newNode;
        }
        path.reverse();
        return path;
    }

    function animatePath(path, nodes, setNodes) {
        for (let i=0; i<path.length; i++) {
            setTimeout(() => {
                const path_node = path[i];
                const newList = nodes.slice();
                const newNode = {
                    ...path_node,
                    isPath: true,
                }
                newList[path_node.row][path_node.column] = newNode;
                setNodes(newList);
            }, (animationSpeed * i));
        }
    }

    function animateAlgorithm(path, nodes, endNode, setNodes) {
        for (let i=0; i<=path.length; i++) {
            if (i === path.length) {
                setTimeout(() => {
                    animatePath(createPath(endNode), nodes, setNodes);
                }, animationSpeed * i);
            }
            else {
                setTimeout(() => {
                    const node = path[i];
                    const newList = nodes.slice();
                    const newNode = {
                        ...node,
                        isMarked: true,
                    };
                    newList[node.row][node.column] = newNode;
                    setNodes(newList);
                    //console.log(newList);
                }, (animationSpeed * i));
            }
        };
    }

    function animateMaze(value) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        let newNodes;
        if (value === "random") {
            newNodes = createRandomMaze(nodes, startNode, endNode);
        }
        else if (value === "recursive") {
            newNodes = createRecursiveMaze(nodes, startNode, endNode);
        }
        setNodes(newNodes);
    }
    
    function visualizeDijkstra(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = dijkstraAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    };

    function visualizeAstar(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = astarAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    }

    function visualizeBFS(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = bfsAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    }

    function visualizeDFS(nodes, setNodes) {
        const startNode = nodes[8][10];
        const endNode = nodes[8][40];
        const path = dfsAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    }

    // Algorithms selection function
    function selectAlgorithm(value) {
        setFeaturedAlgorithm(value);
        console.log(featured_algorithm);
    }

    function selectAnimationSpeed(value) {
        if (value === "fast") {
            setAnimationSpeed(25);
        }
        else if (value === "average") {
            setAnimationSpeed(50);
        }
        else if (value === "slow") {
            setAnimationSpeed(100);
        }
        else {
            console.log("Error: unknown animation speed parameter");
        }
    }

    function visualizeSelectedAlgorithm() {
        if (featured_algorithm === "Dijkstra") {
            visualizeDijkstra(nodes, setNodes);
        }
        else if (featured_algorithm === "A*") {
            visualizeAstar(nodes, setNodes);
        }
        else if (featured_algorithm === "BFS") {
            visualizeBFS(nodes, setNodes);
        }
        else if (featured_algorithm === "DFS") {
            visualizeDFS(nodes, setNodes);
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
        <div className="App">
            <NavBar
                currentAnimationSpeed={animationSpeed}
                currentAlgorithm={featured_algorithm}
                selectAlgorithm={selectAlgorithm}
                selectMazeType={animateMaze}
                selectAnimationSpeed={selectAnimationSpeed}
                visualizeSelectedAlgorithm={() => visualizeSelectedAlgorithm()}
                clearGrid={clearGrid}
                clearPath={clearPath}
            />
            <Description />
            <div className="App--container">
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
        </div>
    );
};

// visualizeDijkstra(nodes, setNodes)