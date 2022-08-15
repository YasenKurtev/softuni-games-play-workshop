let CatalogItem = (props) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={props.game.imageUrl} />
                <h6>{props.game.category}</h6>
                <h2>{props.game.title}</h2>
                <a href="#" className="details-button">
                    Details
                </a>
            </div>
        </div>
    )
}

export default CatalogItem