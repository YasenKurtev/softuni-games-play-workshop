import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../services/gameService";

export let GameContext = createContext();

export let GameProvider = ({ children }) => {
    let [games, setGames] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(games => {
                setGames(state => state = games);
            });
    }, [])

    return (
        <GameContext.Provider value={{ setGames: setGames, games: games, navigate: navigate }}>
            {children}
        </GameContext.Provider>
    )
}