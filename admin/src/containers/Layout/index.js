import React from 'react';
import Header from '../../components/Header';
import './Layout.css';

const Layout = ({ children }) => {
    return(
        <React.Fragment>
            <Header />
            <div className="layout-children">
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;