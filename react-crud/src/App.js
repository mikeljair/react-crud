import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ItemsPage from './pages/Items';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/items" element={<ItemsPage/>}/>
            </Routes>
        </Router>
    );
}
