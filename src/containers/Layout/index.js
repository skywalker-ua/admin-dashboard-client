import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import './Layout.css';

const Layout = ({ children }) => {
    return(
        <div className="main-layout">
            <Header />
            <main className="layout-children">
            <Sidebar />
                <div className="layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;