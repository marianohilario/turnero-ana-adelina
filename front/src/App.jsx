import "./App.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Appointments from "./views/Appointments/Appointments";
import Calendar from "./components/Calendar/Calendar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <main className="mainContainer">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    );
}

export default App;
