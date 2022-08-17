import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService"
import CatalogItem from "./CatalogItem/CatalogItem"

let Catalog = (props) => {
    let [games, setGames] = useState([]);

    useEffect(() => {
        getAllGames()
            .then(games => {
                console.log(games);
                setGames(state => state = games);
            })
    }, [])

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length === 0
                ? <h3 className="no-articles">No articles yet</h3>
                : games.map(x => <CatalogItem key={x._id} game={x} />)}
        </section>
    )
}

export default Catalog