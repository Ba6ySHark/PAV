import "../App.css";
import PAVnode from "./PAVnode.js";

export default function PAVcanvas() {
    let nodes = [];
    const rows = 15;
    const columns = 50;

    for (let i=0; i<rows; i+=1) {
        let subArray = [];
        for (let j=0; j<columns; j+=1) {
            subArray.push(<PAVnode />);
        }
        nodes.push(<div id="line">{subArray}</div>);
    }

    return (
        <div className="canvas">
            {nodes}
        </div>
    );
};