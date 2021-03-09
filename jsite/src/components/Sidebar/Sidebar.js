import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@components';

const Sidebar = () => {
    return (
        <aside id="left-panel" className="left-panel">
            <Navbar expand="sm" className="px-0">
                <div className="navbar-header">
                    <Navbar.Brand className="text-white py-3 border-bottom w-100">리액트 사이트</Navbar.Brand>
                    <Navbar.Toggle>
                        <Icon icon={faBars} />
                    </Navbar.Toggle>
                </div>
            </Navbar>
        </aside>
    );
};

export default Sidebar;
