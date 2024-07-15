import { useState } from "react";
import "./App.css";
import Home from "./views/Home/Home";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="home-container">
                <Home />
            </div>
        </>
    );
}

export default App;
