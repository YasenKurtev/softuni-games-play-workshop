import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';

function App() {
    return (
        <div id="box">
            <Navigation />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/catalog' element={<Catalog />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;