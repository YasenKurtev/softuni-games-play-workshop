import { useContext } from "react"
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext"

let GameOwner = () => {
    let { user } = useContext(AuthContext);
    let { gameId } = useParams();

    if (user._id !== gameId) {
        return <Navigate to='/catalog' replace />
    }

    return <Outlet />
}

export default GameOwner;