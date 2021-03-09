import React from 'react';
import Col from 'react-bootstrap/Col';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@components';

const Content = ({ children }) => {
    return (
        <div id="right-panel" className="right-panel">
            <header id="header" className="header">
                <div className="header-menu">
                    <Col sm={7}>
                        <a id="menuToggle" className="menutoggle float-left">
                            <Icon icon={faBars} />
                        </a>
                    </Col>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Content;
