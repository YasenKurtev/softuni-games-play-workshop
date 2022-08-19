import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { deleteGame, getAllGames } from "../../services/gameService"
import { GameContext } from "../contexts/gameContex";

let Delete = () => {
    let location = useLocation();
    let game = location.state;
    let { setGames, navigate } = useContext(GameContext);

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