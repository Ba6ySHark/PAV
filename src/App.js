import PAVcanvas from "./components/PAVcanvas.js";
import NavBar from "./components/NavBar.js";

export default function App() {
    return (
        <div className="app">
            <NavBar />
            <PAVcanvas />
        </div>
    );
};