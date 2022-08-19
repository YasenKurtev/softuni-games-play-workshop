import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { registerUser } from "../../services/userService"
import { AuthContext } from "../contexts/authContext"
import { GameContext } from "../contexts/gameContex";

let Register = () => {
    let { setUser } = useContext(AuthContext);
    let { navigate } = useContext(GameContext);

    let [inputs, setInputs] = useState({
        email: '',
        password: '',
        'confirm-password': ''
    })

    let [errors, setErrors] = useState({
        email: false,
        password: false,
        'confirm-password': false
    })

    let onChangeHandler = (e) => {
        setInputs(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    let isIncorrect = (e) => {
        if (e.target.value === '') {
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

    let onSubmitHandler = (e) => {
        e.preventDefault();
        registerUser(inputs.email, inputs.password)
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                let storedUser = localStorage.getItem('user');
                setUser(state => state = JSON.parse(storedUser));
                navigate('/');
            })
    }

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmitHandler}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" value={inputs.email} onChange={onChangeHandler} onBlur={isIncorrect} />
                    {errors.email === true
                        ? <p style={{ 'color': 'red' }}>Please fill this field!</p>
                        : null}
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" value={inputs.password} onChange={onChangeHandler} onBlur={isIncorrect} />
                    {errors.password === true
                        ? <p style={{ 'color': 'red' }}>Please fill this field!</p>
                        : null}
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" value={inputs.repeatPassword} onChange={onChangeHandler} onBlur={isIncorrect} />
                    {errors['confirm-password'] === true
                        ? <p style={{ 'color': 'red' }}>Please fill this field!</p>
                        : null}
                    <input className="btn submit" type="submit" value="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Register