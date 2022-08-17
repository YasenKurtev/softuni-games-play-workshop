import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { AuthContext } from '../contexts/authContext';

let Login = () => {
    let { setUser, navigate } = useContext(AuthContext);

    let [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    let [errors, setErrors] = useState({
        email: false,
        password: false
    })

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

    let onChangeHandler = (e) => {
        setInputs(({
            ...inputs,
            [e.target.name]: e.target.value
        }))
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        loginUser(inputs.email, inputs.password)
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                let storedUser = localStorage.getItem('user');
                setUser(state => state = JSON.parse(storedUser));
                navigate('/');
            })
    }

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmitHandler}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" value={inputs.email} onChange={onChangeHandler} onBlur={isIncorrect} />
                    {errors.email === true
                        ? <p style={{ 'color': 'red' }}>Please fill this field!</p>
                        : null}
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" value={inputs.password} onChange={onChangeHandler} onBlur={isIncorrect} />
                    {errors.password === true
                        ? <p style={{ 'color': 'red' }}>Please fill this field!</p>
                        : null}
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>
                            If you don't have а profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Login