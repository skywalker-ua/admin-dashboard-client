import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => {},
    setUser: () => {},
    user: {
        name: '',
        surname: '',
        email: ''
    }
});

export default authContext;