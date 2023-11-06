import React, { useState } from 'react';
import './Register.css';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        // Prevent the default form submit action
        event.preventDefault();

        // Log the credentials to the console for debugging purposes
        // WARNING: In a production application, do NOT log credentials!
        console.log('Submitted credentials:', { username, password });

        try {
            // Send a POST request to the server endpoint
            const response = await fetch(props.server_url + '/api/users/register', {
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

        } catch (error) {
            // If there's an error during fetch, handle it here (e.g., show an error message)
            console.error('Error during API call', error);
        }
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
