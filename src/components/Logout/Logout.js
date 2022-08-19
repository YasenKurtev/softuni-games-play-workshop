import { useContext } from "react";
import { logoutUser } from "../../services/userService"
import { AuthContext } from "../contexts/authContext";
import { GameContext } from "../contexts/gameContex";

let Logout = () => {
    let { user, setUser } = useContext(AuthContext);
    let { navigate } = useContext(GameContext);

    logoutUser(user.accessToken)
        .then(() => {
            localStorage.removeItem('user');
            setUser(state => state = undefined);
            navigate('/');
        })
}

export default Logout   