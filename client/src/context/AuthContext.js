import React, { createContext, useState, useContext, useEffect } from 'react';
import userAuth from "../helpers/userAuth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check the authentication status on initial load
    useEffect(() => {
        const checkAuth = async () => {

            try {
                const result = await userAuth();
                setIsAuthenticated(result);
            } catch (error) {
                console.error('Error during authentication check', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }

        };

        checkAuth().catch(error => {
            console.error('Error during authentication check', error);
        });

    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner/loader component
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
