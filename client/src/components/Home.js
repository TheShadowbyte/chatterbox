import React from 'react';

function Home() {

    const loginStatus = localStorage.getItem('token') ? 'logged in' : 'logged out';

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <p>You are {loginStatus}</p>
        </div>
    );
}

export default Home;
