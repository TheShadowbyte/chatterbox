import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import RegisterForm from "./RegisterForm";
import {useAuth} from "../../context/AuthContext";

function Register(props) {

    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(props.server_url + '/api/users/register', {
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
        <div className="register-container">
            <h2>Register</h2>
            <RegisterForm handleSubmit={handleSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        </div>
    );
}

export default Register;
