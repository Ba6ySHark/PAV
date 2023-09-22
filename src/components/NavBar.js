export default function NavBar(props) {
    let speed;
    if (props.currentAnimationSpeed === 25) {
        speed = "Fast";
    }
    else if (props.currentAnimationSpeed === 50) {
        speed = "Average";
    }
    else if (props.currentAnimationSpeed === 100) {
        speed = "Slow";
    }

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
                    <li><button>Random Maze</button></li>
                    <li><button>Recursive Maze</button></li>
                </ul>
            </div>
            <button className="test">Add Bomb</button>
            <button onClick={() => props.visualizeSelectedAlgorithm()}>Visualize</button>
            <button onClick={() => props.clearGrid()}>Clear Grid</button>
            <button onClick={() => props.clearPath()}>Clear Path</button>
            <div className="speed--settings">
                <h3>Speed: {speed}</h3>
                <ul className="speeds--list">
                    <li><button onClick={() => props.selectAnimationSpeed("fast")}>Fast</button></li>
                    <li><button onClick={() => props.selectAnimationSpeed("average")}>Average</button></li>
                    <li><button onClick={() => props.selectAnimationSpeed("slow")}>Slow</button></li>
                </ul>
            </div>
        </div>
    );
};