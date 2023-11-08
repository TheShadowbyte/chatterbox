import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const navigate = useNavigate();

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {

        if (!isAuthenticated && window.location.pathname !== '/register') {
            navigate('/login');
        }

    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!isAuthenticated && (
                        <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                        <li><Link to="/chat">Chat</Link></li>
                        <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );

}

export default Header;