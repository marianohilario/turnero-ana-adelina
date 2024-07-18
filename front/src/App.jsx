import "./App.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Appointments from "./views/Appointments/Appointments";

function App() {
    return (
        <main className="mainContainer">
            <Navbar />
            {/* <Home /> */}
            <Appointments />
        </main>
    );
}

export default App;
