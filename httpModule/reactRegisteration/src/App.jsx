import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './components/Registeration/Registeration';
import Login from './components/Login/Login';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <h1>Welcome to Our App</h1>

                {/* Navigation Links */}
                <nav>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
