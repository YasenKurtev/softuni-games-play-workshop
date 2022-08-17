import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGameDetails } from "../../services/gameService";
import { AuthContext } from "../contexts/authContext";

let GameDetails = (props) => {
    let { user } = useContext(AuthContext);
    let { gameId } = useParams();
    let [game, setGame] = useState({})
    let [comment, setComment] = useState('');
    let [error, setError] = useState(false);

    useEffect(() => {
        getGameDetails(gameId)
            .then(game => {
                setGame(state => state = game);
            })
    }, [])

    let onChangeHandler = (e) => {
        setComment(state => state = e.target.value)
    }

    let isEmptyHandler = (e) => {
        if (e.target.value === '') {
            setError(true)
        } else {
            setError(false)
        }
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        props.addCommentHandler(gameId, comment);
    }

    // let [game, setGame] = useState({});

    // useEffect(() => {
    //     getGameDetails(gameId)
    //         .then(game => {
    //             console.log(game);
    //             setGame(state => state = game);
    //         })
    // }, [])

    // let game = props.games.find(x => x._id === gameId);

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>Bright</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {!game.hasOwnProperty('comments')
                            ? <p className="no-comment">No comments.</p>
                            : game.comments.map(x =>
                                <li className="comment">
                                    <p>Content: {x}</p>
                                </li>
                            )}
                    </ul>
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game ) */}
                {user === undefined
                    ? null
                    :
                    user._id === game._ownerId
                        ? <div className="buttons">
                            <Link to={`/edit/${gameId}`} state={game} className="button" >
                                Edit
                            </Link>
                            <Link to={`/delete/${gameId}`} className="button">
                                Delete
                            </Link>
                        </div>
                        : null}

            </div>

            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmitHandler}>
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {error === true
                        ? <p style={{ 'color': 'red' }}>Error</p>
                        : null}
                    <input className="btn submit" type="submit" defaultValue="Add Comment" />
                </form>
            </article>
        </section>
    )
}

export default GameDetails