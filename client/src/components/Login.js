import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login(props) {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // or sessionStorage, or cookies

        if (token) {
            // Verify the token by sending it to the backend
            fetch('/api/validateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Token is valid, redirect to home page
                        navigate('/');
                    } else {
                        // Token is not valid, do nothing or handle as needed
                        // You might want to clear the token if it's invalid
                        localStorage.removeItem('token');
                        console.log('Token is not valid');
                    }
                })
                .catch(error => {
                    console.error('Error validating token:', error);
                    // Optionally handle any other errors, like network issues
                });
        }
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        // Prevent the default form submit action
        event.preventDefault();

        // Log the credentials to the console for debugging purposes
        // WARNING: In a production application, do NOT log credentials!
        console.log('Submitted credentials:', { username, password });

        try {
            console.log(props.server_url);
            // Send a POST request to the server endpoint
            const response = await fetch(props.server_url + '/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Parse the JSON response body
            const data = await response.json();

            // Log the response data to the console
            console.log(data);

            // Handle the response data in your application (e.g., navigate to a new page or show a message)
            // ...

            localStorage.setItem('token', data.token);

        } catch (error) {
            // If there's an error during fetch, handle it here (e.g., show an error message)
            console.error('Error during API call', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
