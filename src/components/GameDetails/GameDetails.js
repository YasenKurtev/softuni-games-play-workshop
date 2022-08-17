import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { addComment, getComments, getGameDetails } from "../../services/gameService";
import { AuthContext } from "../contexts/authContext";

let GameDetails = (props) => {
    let { user } = useContext(AuthContext);
    let { gameId } = useParams();
    let [game, setGame] = useState({})
    let [comments, setComments] = useState([]);
    let [input, setInput] = useState('');
    let [error, setError] = useState(false);

    useEffect(() => {
        getGameDetails(gameId)
            .then(game => {
                setGame(state => state = game);
            })
    }, [])

    useEffect(() => {
        getComments(gameId)
            .then(comments => {
                setComments(state => state = comments)
            })
    }, [])

    let onChangeHandler = (e) => {
        setInput(state => state = e.target.value)
    }

    let isEmptyHandler = (e) => {
        e.target.value === '' ? setError(state => state = true) : setError(state => state = false)
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        addComment({ gameId: gameId, comment: input })
            .then(comment => setComments(state => ([
                ...state,
                comment
            ])))
    }

    let isFormValid = error;

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
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
                        {comments.length === 0
                            ? <p className="no-comment">No comments.</p>
                            : comments.map(x =>
                                <li key={x._id} className="comment">
                                    <p>Content: {x.comment}</p>
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
                            <Link to={`/delete/${gameId}`} state={game} className="button">
                                Delete
                            </Link>
                        </div>
                        : null}

            </div>

            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            {user !== undefined && user._id !== game._ownerId
                ? <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmitHandler}>
                        <textarea name="comment" placeholder="Comment......" value={input} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                        {error === true
                            ? <p style={{ 'color': 'red' }}>This field is empty!!!</p>
                            : null}
                        <input className="btn submit" type="submit" defaultValue="Add Comment" disabled={isFormValid} />
                    </form>
                </article>
                : null}

        </section>
    )
}

export default GameDetails