import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => {},
    logout: () => {},
    setUser: () => {},
    setToken: () => {},
    user: {
        name: '',
        surname: '',
        email: ''
    },
    token: undefined
});

export default authContext;