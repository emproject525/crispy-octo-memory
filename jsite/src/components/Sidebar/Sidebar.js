import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@components';

const propTypes = {
    /**
     * 사이드바 오픈 여부
     */
    sidebarIsOpen: PropTypes.bool,
};
const defaultProps = {
    sidebarIsOpen: false,
};

const Sidebar = (props) => {
    const { sidebarIsOpen } = props;

    return (
        <aside id="left-panel" className={clsx('left-panel', { 's-close': !sidebarIsOpen })}>
            <Navbar expand="sm" className="px-0">
                <div className="navbar-header">
                    <Navbar.Brand className="text-white py-3 border-bottom w-100">리액트 사이트</Navbar.Brand>
                    <Navbar.Toggle>
                        <Icon icon={faBars} />
                    </Navbar.Toggle>
                </div>
                <Navbar.Collapse className="main-menu">
                    <Nav className="nav"></Nav>
                </Navbar.Collapse>
            </Navbar>
        </aside>
    );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
