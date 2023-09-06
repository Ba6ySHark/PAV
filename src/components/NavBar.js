export default function NavBar(props) {
    return (
        <div className="nav">
            <h1>PAV</h1>
            <div className="featured--algos">
                <h3>Algorithms</h3>
                <ul className="algo--list">
                    <li><button onClick={() => props.selectAlgorithm("Dijkstra")}>Dijkstra</button></li>
                    <li><button onClick={() => props.selectAlgorithm("A*")}>A*</button></li>
                    <li><button onClick={() => props.selectAlgorithm("BFS")}>BFS</button></li>
                    <li><button onClick={() => props.selectAlgorithm("DFS")}>DFS</button></li>
                </ul>
            </div>
            <div className="wall--patterns">
                <h3>Wall Patterns</h3>
                <ul className="patterns--list">
                    <li></li>
                </ul>
            </div>
            <button className="test">Add Bomb</button>
            <button onClick={() => props.visualizeDijkstra(props.nodes, props.setNodes)}>Visualize</button>
            <button onClick={() => props.clearGrid()}>Clear Grid</button>
            <button onClick={() => props.clearPath()}>Clear Path</button>
            <div className="speed--settings">
                <h3>Speed:</h3>
                <ul className="speeds--list">
                    <li>Fast</li>
                    <li>Average</li>
                    <li>Slow</li>
                </ul>
            </div>
        </div>
    );
};