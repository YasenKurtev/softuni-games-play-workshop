import GameItem from "./GameItem/GameItem"

let Home = (props) => {
    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>
                {props.games.length === 0
                    ? <p className="no-articles">No games yet</p>
                    : props.games.slice(0, 3).map(x => <GameItem key={x._id} game={x} />)}
            </div>
        </section>
    )
}

export default Home