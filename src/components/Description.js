export default function Description(props) {
    return (
        <ul className="description">
            <li className="description--element">
                <div className="start"></div>
                <h2>Start Node</h2>
            </li>
            <li className="description--element">
                <div className="end"></div>
                <h2>Target Node</h2>
            </li>
            <li className="description--element">
                <div className="node"></div>
                <h2>Unvisited Node</h2>
            </li>
            <li className="description--element">
                    <div className="node"></div>
                    <h2>Visited Node</h2>
            </li>
            <li className="description--element">
                    <div className="node"></div>
                    <h2>Shortest-path Node</h2>
            </li>
            <li className="description--element">
                    <div className="node"></div>
                    <h2>Wall Node</h2>
            </li>
        </ul>
    );
}