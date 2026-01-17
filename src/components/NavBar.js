import React from "react";

export default function NavBar(props) {
    const [openDropdown, setOpenDropdown] = React.useState(null);

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

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const handleAlgorithmSelect = (algorithm) => {
        props.selectAlgorithm(algorithm);
        setOpenDropdown(null);
    };

    const handleMazeSelect = (mazeType) => {
        props.selectMazeType(mazeType);
        setOpenDropdown(null);
    };

    const handleSpeedSelect = (speed) => {
        props.selectAnimationSpeed(speed);
        setOpenDropdown(null);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.featured--algos') && 
                !event.target.closest('.wall--patterns') && 
                !event.target.closest('.speed--settings')) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [openDropdown]);

    return (
        <div className="nav">
            <h1>PAV</h1>
            <div className="featured--algos">
                <h3 onClick={() => toggleDropdown('algorithms')}>Algorithms</h3>
                <ul className={`algo--list ${openDropdown === 'algorithms' ? 'open' : ''}`}>
                    <li><button onClick={() => handleAlgorithmSelect("Dijkstra")}>Dijkstra</button></li>
                    <li><button onClick={() => handleAlgorithmSelect("A*")}>A*</button></li>
                    <li><button onClick={() => handleAlgorithmSelect("BFS")}>BFS</button></li>
                    <li><button onClick={() => handleAlgorithmSelect("DFS")}>DFS</button></li>
                </ul>
            </div>
            <div className="wall--patterns">
                <h3 onClick={() => toggleDropdown('patterns')}>Wall Patterns</h3>
                <ul className={`patterns--list ${openDropdown === 'patterns' ? 'open' : ''}`}>
                    <li><button onClick={() => handleMazeSelect("random")}>Random Maze</button></li>
                    <li><button onClick={() => handleMazeSelect("recursive")}>Recursive Maze</button></li>
                </ul>
            </div>
            <button onClick={() => props.visualizeSelectedAlgorithm()}>Visualize {props.currentAlgorithm}</button>
            <button onClick={() => props.clearGrid()}>Clear Grid</button>
            <button onClick={() => props.clearPath()}>Clear Path</button>
            <div className="speed--settings">
                <h3 onClick={() => toggleDropdown('speed')}>Speed: {speed}</h3>
                <ul className={`speeds--list ${openDropdown === 'speed' ? 'open' : ''}`}>
                    <li><button onClick={() => handleSpeedSelect("fast")}>Fast</button></li>
                    <li><button onClick={() => handleSpeedSelect("average")}>Average</button></li>
                    <li><button onClick={() => handleSpeedSelect("slow")}>Slow</button></li>
                </ul>
            </div>
        </div>
    );
};