import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import { useState, useEffect } from 'react';
import { getAllGames } from './services/gameService';
import GameDetails from './components/GameDetails/GameDetails';
import uniqid from 'uniqid';
import Logout from './components/Logout/Logout';

function App() {
    let [user, setUser] = useState(undefined);
    let [games, setGames] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(games => {
                console.log(games);
                localStorage.setItem('games', JSON.stringify(games));
                setGames(games);
            });
        let storedUser = localStorage.getItem('user');
        storedUser === null ? setUser(state => state = undefined) : setUser(state => state = JSON.parse(storedUser));
    }, [])

    let addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            { ...gameData, _id: uniqid() }
        ])
        navigate('/catalog')
    }

    let addCommentHandler = (gameId, comment) => {
        setGames(state => {
            let game = state.find(x => x._id === gameId);
            if (game.hasOwnProperty('comments')) {
                game.comments.push(comment)
            } else {
                game.comments = [comment]
            }
            console.log(game.comments);
            return [
                ...state.filter(x => x._id !== gameId),
                game
            ]
        })
    }

    return (
        <div id="box">
            <Navigation user={user} />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home games={games} />} />
                    <Route path='/login' element={<Login setUser={setUser} />} />
                    <Route path='/register' element={<Register setUser={setUser} />} />
                    <Route path='/logout' element={<Logout user={user} setUser={setUser} />} />
                    <Route path='/create' element={<Create addGameHandler={addGameHandler} />} />
                    <Route path='/catalog' element={<Catalog games={games} />} />
                    <Route path='/catalog/:gameId' element={<GameDetails games={games} addCommentHandler={addCommentHandler} />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;