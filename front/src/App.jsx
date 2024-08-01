import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Appointments from "./views/Appointments/Appointments";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Services from "./views/Services/Services";
import Contact from "./views/Contact/Contact";

function App() {
    return (
        <main className="mainContainer">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/appointments/"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <ToastContainer />
        </main>
    );
}

export default App;
