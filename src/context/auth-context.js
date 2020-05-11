import React from 'react';

const AuthContext = React.createContext();

const AuthProvider = () => {

    const login = () => {}
    const register = () => {}
    const logout = () => {} 

    return(
        <AuthContext.Provider value={{data, login, logout, register}} {...props} />
    );
};

const useAuth = () => React.useContext(AuthContext);

export{AuthProvider, useAuth};