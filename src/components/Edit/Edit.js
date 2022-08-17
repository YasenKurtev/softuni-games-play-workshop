import { useLocation } from "react-router-dom";
import { useContext, useState } from "react"
import { editGame, getAllGames } from "../../services/gameService";
import { AuthContext } from "../contexts/authContext";
import { GameContext } from "../contexts/gameContex";

let Edit = () => {
    let location = useLocation();
    let game = location.state;
    let { navigate } = useContext(AuthContext);
    let { setGames } = useContext(GameContext);

    let [inputs, setInputs] = useState({
        title: game.title,
        category: game.category,
        maxLevel: game.maxLevel,
        imageUrl: game.imageUrl,
        summary: game.summary
    })

    let [errors, setErrors] = useState({
        title: false,
        category: false,
        maxLevel: false,
        imageUrl: false,
        summary: false
    })

    let onChangeHandler = (e) => {
        setInputs(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    let isEmptyHandler = (e) => {
        if (e.target.value.length === 0) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true
            }))
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false
            }))
        }
    }

    let isFormValid = Object.values(inputs).some(x => x === '');

    let onSubmitHandler = (e) => {
        e.preventDefault();
        editGame(game._id, inputs)
            .then(() => {
                getAllGames()
                    .then(games => {
                        console.log(games);
                        setGames(state => state = games);
                        navigate(`/catalog/${game._id}`);
                    })
            })
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmitHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={inputs.title} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.title === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={inputs.category} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.category === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min={1} value={inputs.maxLevel} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.maxLevel === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={inputs.imageUrl} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.imageUrl === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={inputs.summary} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.summary === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <input className="btn submit" type="submit" defaultValue="Edit Game" disabled={isFormValid} />
                </div>
            </form>
        </section>
    )
}

export default Edit