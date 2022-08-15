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

function App() {
    let [games, setGames] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(games => {
                console.log(games);
                setGames(games);
            });
    }, [])

    let addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            { ...gameData, _id: uniqid() }
        ])
        navigate('/catalog')
    }

    return (
        <div id="box">
            <Navigation />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home games={games} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/create' element={<Create addGameHandler={addGameHandler} />} />
                    <Route path='/catalog' element={<Catalog games={games} />} />
                    <Route path='/catalog/:gameId' element={<GameDetails games={games} />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;