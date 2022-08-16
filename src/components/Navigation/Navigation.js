import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"

let Navigation = (props) => {
    let { user } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {user === undefined
                    ? <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                    : <div id="user">
                        <Link to="/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>}
            </nav>
        </header>
    )
}

export default Navigation