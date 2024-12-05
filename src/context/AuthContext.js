// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if a valid token exists
        console.log("AuthProvider.js: useEffect() called");
        const token = localStorage.getItem('authToken');
        console.log("token = " + token);
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        console.log("AuthProvider.js: login() called");
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
