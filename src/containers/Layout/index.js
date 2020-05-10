import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
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
            <Sidebar open={drawerState} onClose={onClose} />
                <div className="layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;