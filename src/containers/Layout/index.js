import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import AuthContext from '../../context/auth-context';
import './Layout.css';

const Layout = ({ children }) => {
    const [drawerState, setDrawerState ] = useState(false);
    const onClick = () => {
        setDrawerState(true);
    }
    const onClose = () => {
        setDrawerState(false)
    }
    return(
        
        <div className="main-layout">
            <Header onClick={onClick} />
            <main className="layout-children">
            <AuthContext.Consumer>
            {context => context.authenticated ? 
            <>
            <Sidebar user={context.user} open={drawerState} onClose={onClose} />
            </>
            : null }
            </AuthContext.Consumer>
            
                <div className="layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;