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

function App() {
    let [user, setUser] = useState(undefined);
    let [games, setGames] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(games => {
                setGames(games);
            });
        let storedUser = localStorage.getItem('user');
        storedUser === null ? setUser(state => state = undefined) : setUser(state => state = JSON.parse(storedUser));
    }, [])

    return (
        <div id="box">
            <AuthContext.Provider value={{ user: user, setUser: setUser, navigate: navigate }}>
                <Navigation user={user} />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home games={games} setGames={setGames} />} />
                        <Route path='/login' element={<Login setUser={setUser} />} />
                        <Route path='/register' element={<Register setUser={setUser} />} />
                        <Route path='/logout' element={<Logout user={user} setUser={setUser} />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/catalog' element={<Catalog games={games} />} />
                        <Route path='/catalog/:gameId' element={<GameDetails games={games} />} />
                        <Route path='/edit/:gameId' element={<Edit />} />
                        <Route path='/delete/:gameId' element={<Delete />} />
                    </Routes>

                </main>
            </AuthContext.Provider>
        </div>
    )
}

export default App;