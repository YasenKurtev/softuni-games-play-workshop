import CatalogItem from "./CatalogItem/CatalogItem"

let Catalog = (props) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {props.games.length === 0
                ? <h3 className="no-articles">No articles yet</h3>
                : props.games.map(x => <CatalogItem key={x._id} game={x} />)}


        </section>
    )
}

export default Catalog