import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { deleteGame } from "../../services/gameService"
import { AuthContext } from "../contexts/authContext";

let Delete = () => {
    let location = useLocation();
    let game = location.state;
    let { navigate } = useContext(AuthContext);

    deleteGame(game._id)
        .then(navigate('/catalog'))
}

export default Delete