import visualizeDijkstra from "./PAVcanvas.js";

export default function NavBar() {
    return (
        <div className="nav">
            <h1>PAV</h1>
            <div className="featured--algos">
                <h3>Algorithms</h3>
                <ul className="algo--list">
                    <li>Dijkstra</li>
                    <li>A*</li>
                    <li>BFS</li>
                    <li>DFS</li>
                </ul>
            </div>
            <div className="wall--patterns">
                <h3>Wall Patterns</h3>
                <ul className="patterns--list">
                    <li></li>
                </ul>
            </div>
            <button>Add Bomb</button>
            <button onClick={() => visualizeDijkstra()}>Visualize</button>
            <button>Clear Grid</button>
            <button>Clear Path</button>
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