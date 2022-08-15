import { useState } from "react"

let Create = (props) => {
    let [inputs, setInputs] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
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
        props.addGameHandler(inputs);
    }

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmitHandler}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title..." value={inputs.title} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.title === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." value={inputs.category} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.category === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min={1} placeholder={1} value={inputs.maxLevel} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.maxLevel === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." value={inputs.imageUrl} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.imageUrl === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={inputs.summary} onChange={onChangeHandler} onBlur={isEmptyHandler} />
                    {errors.summary === true
                        ? <p style={{ "color": "red" }}>This field is empty!!!</p>
                        : null}
                    <input className="btn submit" type="submit" defaultValue="Create Game" disabled={isFormValid} />
                </div>
            </form>
        </section >
    )
}

export default Create