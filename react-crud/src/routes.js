import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';

function AppRoutes() {
    const {user, loading} = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                    <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
                    <Route path="/" element={user ? <Users/> : <Navigate to="/login"/>}/>
                    //<Route path="/users" element={user ? <Users/> : <Navigate to="/login"/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default AppRoutes;
