import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

function Login(props) {

    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(props.server_url + '/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Parse the JSON response body
            const data = await response.json();

            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);

            navigate('/');


        } catch (error) {
            // If there's an error during fetch, handle it here (e.g., show an error message)
            console.error('Error during API call', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <LoginForm handleSubmit={handleSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        </div>
    );
}

export default Login;
