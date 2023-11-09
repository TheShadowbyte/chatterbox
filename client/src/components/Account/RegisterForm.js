import React from "react";

const RegisterForm = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={props.username}
                        onChange={(e) => props.setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )

};

export default RegisterForm;