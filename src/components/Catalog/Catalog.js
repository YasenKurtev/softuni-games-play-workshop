import { useContext } from "react"
import { GameContext } from "../contexts/gameContex"
import CatalogItem from "./CatalogItem/CatalogItem"

let Catalog = () => {
    let { games } = useContext(GameContext);

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