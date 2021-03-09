import React from 'react';
import { Sidebar, Content } from '@components';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            {/* Left Panel */}
            <Sidebar />

            {/* Right Panel */}
            <Content>{children}</Content>
        </React.Fragment>
    );
};

export default Layout;
