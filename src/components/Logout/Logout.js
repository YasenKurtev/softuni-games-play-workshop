import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService"

let Logout = (props) => {
    let navigate = useNavigate();

    logoutUser(props.user.accessToken)
        .then(res => {
            localStorage.removeItem('user');
            props.setUser(state => state = undefined);
            navigate('/')
        })
}

export default Logout   