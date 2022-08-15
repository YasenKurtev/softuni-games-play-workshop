import { Link } from 'react-router-dom';

let CatalogItem = (props) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={props.game.imageUrl} />
                <h6>{props.game.category}</h6>
                <h2>{props.game.title}</h2>
                <Link to={`/catalog/${props.game._id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    )
}

export default CatalogItem