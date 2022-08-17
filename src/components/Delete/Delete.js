import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { deleteGame, getAllGames } from "../../services/gameService"
import { AuthContext } from "../contexts/authContext";
import { GameContext } from "../contexts/gameContex";

let Delete = (props) => {
    let location = useLocation();
    let game = location.state;
    let { navigate } = useContext(AuthContext);
    let { setGames } = useContext(GameContext);

    deleteGame(game._id)
        .then(() => {
            getAllGames()
                .then(games => {
                    setGames(state => state = games);
                    navigate('/catalog');
                })
        })
}

export default Delete