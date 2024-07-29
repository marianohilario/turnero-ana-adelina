import "./App.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Appointments from "./views/Appointments/Appointments";
import Calendar from "./components/Calendar/Calendar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";

function App() {
    return (
        <main className="mainContainer">
            <Navbar />
            {/* <Home /> */}
            {/* <Appointments /> */}
            {/* <Register /> */}
            <Login />
        </main>
    );
}

export default App;
