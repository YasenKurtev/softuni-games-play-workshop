import GameItem from "./GameItem/GameItem"
import { useState, useEffect, useContext } from 'react';
import { getAllGames } from "../../services/gameService";
import { GameContext } from "../contexts/gameContex";


let Home = (props) => {
    let { games } = useContext(GameContext);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>
                {games.length === 0
                    ? <p className="no-articles">No games yet</p>
                    : games.slice(0, 3).map(x => <GameItem key={x._id} game={x} />)}
            </div>
        </section>
    )
}

export default Home