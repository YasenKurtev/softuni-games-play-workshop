import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/authContext";

let PrivateRoute = () => {
    let { user } = useContext(AuthContext);

    if (user === null) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default PrivateRoute