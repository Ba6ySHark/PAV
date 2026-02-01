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

    // Responsive grid calculation
    const getGridDimensions = () => {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        let nodeSize = 25;
        if (isSmallMobile) {
            nodeSize = 18;
        } else if (isMobile) {
            nodeSize = 20;
        }

        const availableHeight = window.innerHeight - (isMobile ? 250 : 200);
        const availableWidth = window.innerWidth - (isMobile ? 40 : 100);
        
        const rows = Math.floor(availableHeight / nodeSize);
        const columns = Math.floor(availableWidth / nodeSize);
        
        return { rows: Math.max(10, rows), columns: Math.max(15, columns), nodeSize };
    };

    const { rows, columns } = getGridDimensions();

    // Calculate initial positions: 5 nodes from edges, vertically centered
    const getInitialStartPos = (rows, cols) => {
        const row = Math.floor(rows / 2); // Vertically centered
        const col = cols >= 11 ? 5 : Math.floor(cols / 4); // 5 from left edge
        return { row, col };
    };
    
    const getInitialEndPos = (rows, cols) => {
        const row = Math.floor(rows / 2); // Vertically centered
        const col = cols >= 11 ? cols - 6 : Math.floor(cols * 0.75); // 5 from right edge
        return { row, col };
    };

    const initialStartPos = getInitialStartPos(rows, columns);
    const initialEndPos = getInitialEndPos(rows, columns);
    
    const [startPos, setStartPos] = React.useState(initialStartPos);
    const [endPos, setEndPos] = React.useState(initialEndPos);
    const [nodes, setNodes] = React.useState(() => createNodeList(rows, columns, startPos.row, startPos.col, endPos.row, endPos.col));
    const [mousePressed, setMouseState] = React.useState(false);
    const [draggingStart, setDraggingStart] = React.useState(false);
    const [draggingEnd, setDraggingEnd] = React.useState(false);

    // Handle window resize with debounce
    React.useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const { rows: newRows, columns: newColumns } = getGridDimensions();
                // Ensure positions are at least 5 from edges and within bounds
                const newStartPos = { 
                    row: Math.max(5, Math.min(startPos.row, newRows - 6)), 
                    col: Math.max(5, Math.min(startPos.col, newColumns - 6)) 
                };
                const newEndPos = { 
                    row: Math.max(5, Math.min(endPos.row, newRows - 6)), 
                    col: Math.max(5, Math.min(endPos.col, newColumns - 6)) 
                };
                setStartPos(newStartPos);
                setEndPos(newEndPos);
                setNodes(createNodeList(newRows, newColumns, newStartPos.row, newStartPos.col, newEndPos.row, newEndPos.col));
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    function toggleWall(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        }
        newGrid[row] = grid[row].slice();
        newGrid[row][col] = newNode;
        return newGrid;
    };

    function handleMouseDown(row, col) {
        const node = nodes[row][col];
        
        // Check if clicking on start or end node
        if (node.isStart) {
            setDraggingStart(true);
            setMouseState(true);
            return;
        }
        if (node.isEnd) {
            setDraggingEnd(true);
            setMouseState(true);
            return;
        }
        
        // Otherwise, toggle wall
        const newGrid = toggleWall(nodes, row, col);
        setMouseState(true);
        setNodes(newGrid);
    };

    function handleMouseHover(row, col) {
        if (!mousePressed) return;
        
        const node = nodes[row][col];
        
        // If dragging start node, move it
        if (draggingStart) {
            if (!node.isEnd && !node.isWall) {
                setStartPos({ row, col });
                setNodes(prevNodes => {
                    const newGrid = prevNodes.map(r => r.map(n => ({ ...n })));
                    // Remove old start
                    newGrid[startPos.row][startPos.col] = {
                        ...newGrid[startPos.row][startPos.col],
                        isStart: false
                    };
                    // Set new start
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        isStart: true
                    };
                    return newGrid;
                });
            }
            return;
        }
        
        // If dragging end node, move it
        if (draggingEnd) {
            if (!node.isStart && !node.isWall) {
                setEndPos({ row, col });
                setNodes(prevNodes => {
                    const newGrid = prevNodes.map(r => r.map(n => ({ ...n })));
                    // Remove old end
                    newGrid[endPos.row][endPos.col] = {
                        ...newGrid[endPos.row][endPos.col],
                        isEnd: false
                    };
                    // Set new end
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        isEnd: true
                    };
                    return newGrid;
                });
            }
            return;
        }
        
        // Otherwise, toggle wall
        const newGrid = toggleWall(nodes, row, col);
        setNodes(newGrid);
    };

    function handleMouseUp() {
        setMouseState(false);
        setDraggingStart(false);
        setDraggingEnd(false);
    };

    function createNodeList(rows, columns, startRow, startCol, endRow, endCol) {
        let nodes = [];
        for (let i=0; i<rows; i++) {
            let subArray = [];
            for (let j=0; j<columns; j++) {
                const node = createNode(i, j, startRow, startCol, endRow, endCol);
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
                setNodes(prevNodes => {
                    const path_node = path[i];
                    const newList = prevNodes.map(row => row.slice());
                    const newNode = {
                        ...newList[path_node.row][path_node.column],
                        isPath: true,
                    }
                    newList[path_node.row][path_node.column] = newNode;
                    return newList;
                });
            }, (animationSpeed * i));
        }
    }

    function animateAlgorithm(path, nodes, endNode, setNodes) {
        for (let i=0; i<=path.length; i++) {
            if (i === path.length) {
                setTimeout(() => {
                    setNodes(currentNodes => {
                        const pathNodes = createPath(endNode);
                        animatePath(pathNodes, currentNodes, setNodes);
                        return currentNodes;
                    });
                }, animationSpeed * i);
            }
            else {
                setTimeout(() => {
                    setNodes(prevNodes => {
                        const node = path[i];
                        const newList = prevNodes.map(row => row.slice());
                        const newNode = {
                            ...newList[node.row][node.column],
                            isMarked: true,
                        };
                        newList[node.row][node.column] = newNode;
                        return newList;
                    });
                }, (animationSpeed * i));
            }
        };
    }

    // Helper function to check if a path exists from start to end
    function pathExists(nodes, startNode, endNode) {
        // Create a deep copy to avoid mutating the original nodes
        const nodesCopy = nodes.map(row => row.map(node => ({ ...node })));
        const startCopy = nodesCopy[startNode.row][startNode.column];
        const endCopy = nodesCopy[endNode.row][endNode.column];
        
        const queue = [startCopy];
        const visited = new Set();
        visited.add(`${startCopy.row},${startCopy.column}`);
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current.row === endCopy.row && current.column === endCopy.column) {
                return true;
            }
            
            const neighbors = [];
            const { row, column } = current;
            
            if (row > 0) neighbors.push(nodesCopy[row - 1][column]);
            if (row < nodesCopy.length - 1) neighbors.push(nodesCopy[row + 1][column]);
            if (column > 0) neighbors.push(nodesCopy[row][column - 1]);
            if (column < nodesCopy[0].length - 1) neighbors.push(nodesCopy[row][column + 1]);
            
            for (const neighbor of neighbors) {
                const key = `${neighbor.row},${neighbor.column}`;
                if (!neighbor.isWall && !visited.has(key)) {
                    visited.add(key);
                    queue.push(neighbor);
                }
            }
        }
        
        return false;
    }

    function animateMaze(value) {
        const startNode = nodes[startPos.row]?.[startPos.col];
        const endNode = nodes[endPos.row]?.[endPos.col];
        
        if (!startNode || !endNode) return;
        
        let newNodes;
        if (value === "random") {
            // For random mazes, regenerate if no path exists (max 50 attempts to avoid infinite loops)
            let attempts = 0;
            const maxAttempts = 50;
            let hasValidPath = false;
            let baseNodes = nodes;
            let currentStartPos = startPos;
            let currentEndPos = endPos;
            
            do {
                // Clear grid first if this is a retry after finding no path
                if (attempts > 0) {
                    const { rows: currentRows, columns: currentColumns } = getGridDimensions();
                    currentStartPos = getInitialStartPos(currentRows, currentColumns);
                    currentEndPos = getInitialEndPos(currentRows, currentColumns);
                    baseNodes = createNodeList(currentRows, currentColumns, currentStartPos.row, currentStartPos.col, currentEndPos.row, currentEndPos.col);
                    setStartPos(currentStartPos);
                    setEndPos(currentEndPos);
                }
                
                const currentStartNode = baseNodes[currentStartPos.row]?.[currentStartPos.col];
                const currentEndNode = baseNodes[currentEndPos.row]?.[currentEndPos.col];
                
                if (!currentStartNode || !currentEndNode) break;
                
                newNodes = createRandomMaze(baseNodes, currentStartNode, currentEndNode);
                attempts++;
                
                // Check if path exists
                const startNodeNew = newNodes[currentStartPos.row]?.[currentStartPos.col];
                const endNodeNew = newNodes[currentEndPos.row]?.[currentEndPos.col];
                
                if (startNodeNew && endNodeNew && pathExists(newNodes, startNodeNew, endNodeNew)) {
                    hasValidPath = true;
                    break;
                }
                
            } while (attempts < maxAttempts);
            
            // If we couldn't find a valid maze after max attempts, clear the grid
            if (!hasValidPath) {
                clearGrid();
                return;
            }
        }
        else if (value === "recursive") {
            newNodes = createRecursiveMaze(nodes, startNode, endNode);
        }
        setNodes(newNodes);
    }
    
    function visualizeDijkstra(nodes, setNodes) {
        const startNode = nodes[startPos.row]?.[startPos.col];
        const endNode = nodes[endPos.row]?.[endPos.col];
        
        if (!startNode || !endNode) return;
        
        const path = dijkstraAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    };

    function visualizeAstar(nodes, setNodes) {
        const startNode = nodes[startPos.row]?.[startPos.col];
        const endNode = nodes[endPos.row]?.[endPos.col];
        
        if (!startNode || !endNode) return;
        
        const path = astarAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    }

    function visualizeBFS(nodes, setNodes) {
        const startNode = nodes[startPos.row]?.[startPos.col];
        const endNode = nodes[endPos.row]?.[endPos.col];
        
        if (!startNode || !endNode) return;
        
        const path = bfsAlgorithm(nodes, startNode, endNode);
        animateAlgorithm(path, nodes, endNode, setNodes);
    }

    function visualizeDFS(nodes, setNodes) {
        const startNode = nodes[startPos.row]?.[startPos.col];
        const endNode = nodes[endPos.row]?.[endPos.col];
        
        if (!startNode || !endNode) return;
        
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
        const { rows: currentRows, columns: currentColumns } = getGridDimensions();
        const newStartPos = getInitialStartPos(currentRows, currentColumns);
        const newEndPos = getInitialEndPos(currentRows, currentColumns);
        setStartPos(newStartPos);
        setEndPos(newEndPos);
        const newNodesList = createNodeList(currentRows, currentColumns, newStartPos.row, newStartPos.col, newEndPos.row, newEndPos.col);
        setNodes(newNodesList);
    };

    // Function that clears marked path nodes from the grid but keeps wall nodes marked
    function clearPath() {
        const { rows: currentRows, columns: currentColumns } = getGridDimensions();
        const newNodesList = createNodeList(currentRows, currentColumns, startPos.row, startPos.col, endPos.row, endPos.col);
        const minRows = Math.min(currentRows, nodes.length);
        const minCols = Math.min(currentColumns, nodes[0]?.length || 0);
        for (let i=0; i<minRows; i++) {
            for (let j=0; j<minCols; j++) {
                if (nodes[i] && nodes[i][j] && nodes[i][j].isWall) {
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
            <div className="App--content">
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
        </div>
    );
};

// visualizeDijkstra(nodes, setNodes)