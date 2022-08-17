import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Create from './components/Create/Create';
import { getAllGames } from './services/gameService';
import GameDetails from './components/GameDetails/GameDetails';
import { AuthContext } from './components/contexts/authContext';
import Edit from './components/Edit/Edit';
import Delete from './components/Delete/Delete';
import { GameContext } from './components/contexts/gameContex';

function App() {
    let [user, setUser] = useState(undefined);
    let [games, setGames] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(games => {
                setGames(state => state = games);
            });
        let storedUser = localStorage.getItem('user');
        storedUser === null ? setUser(state => state = undefined) : setUser(state => state = JSON.parse(storedUser));
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser, navigate: navigate }}>
            <div id="box">

                <Navigation />

                <GameContext.Provider value={{ setGames: setGames, games: games }}>
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:gameId' element={<GameDetails />} />
                            <Route path='/edit/:gameId' element={<Edit />} />
                            <Route path='/delete/:gameId' element={<Delete />} />
                        </Routes>
                    </main>
                </GameContext.Provider>

            </div >
        </AuthContext.Provider >
    )
}

export default App;