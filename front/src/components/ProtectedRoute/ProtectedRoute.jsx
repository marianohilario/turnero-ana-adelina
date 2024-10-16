import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (!user.name) {
        return <Navigate to={"/login"} />;
    }
    return children;
};

export default ProtectedRoute;
