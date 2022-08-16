import { useContext } from "react";
import { logoutUser } from "../../services/userService"
import { AuthContext } from "../contexts/authContext";

let Logout = () => {
    let { user, setUser, navigate } = useContext(AuthContext);

    logoutUser(user.accessToken)
        .then(res => {
            localStorage.removeItem('user');
            setUser(state => state = undefined);
            navigate('/')
        })
}

export default Logout   