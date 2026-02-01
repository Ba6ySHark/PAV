import React from "react";

export default function NavBar(props) {
    const [openDropdown, setOpenDropdown] = React.useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
                !event.target.closest('.speed--settings') &&
                !event.target.closest('.hamburger') &&
                !event.target.closest('.nav--header')) {
                setOpenDropdown(null);
            }
            // Close mobile menu when clicking outside
            if (mobileMenuOpen && 
                !event.target.closest('.nav') && 
                !event.target.closest('.hamburger')) {
                setMobileMenuOpen(false);
            }
        };

        if (openDropdown || mobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [openDropdown, mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav--header">
                <h1><a href="https://ba6yshark.github.io/PAV/" target="_blank" rel="noopener noreferrer">PAV</a></h1>
                <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className={`nav--content ${mobileMenuOpen ? 'open' : ''}`}>
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
        </div>
    );
};