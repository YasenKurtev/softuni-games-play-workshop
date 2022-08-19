import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Create from './components/Create/Create';
import GameDetails from './components/GameDetails/GameDetails';
import Edit from './components/Edit/Edit';
import Delete from './components/Delete/Delete';
import { AuthProvider } from '../src/components/contexts/authContext';
import { GameProvider } from '../src/components/contexts/gameContex';
import PrivateRoute from './components/common/PrivateRoute';
import GameOwner from './components/common/GameOwner';

function App() {

    return (
        <AuthProvider>
            <div id="box">

                <Navigation />

                <GameProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route element={<PrivateRoute />}>
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/create' element={<Create />} />
                            </Route>
                            <Route element={<GameOwner />}>
                                <Route path='/edit/:gameId' element={<Edit />} />
                                <Route path='/delete/:gameId' element={<Delete />} />
                            </Route>
                            <Route path='/catalog/:gameId' element={<GameDetails />} />

                        </Routes>
                    </main>
                </GameProvider>

            </div >
        </AuthProvider >
    )
}

export default App;