import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Col from 'react-bootstrap/Col';
import { faBars, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@components';

const propTypes = {
    /**
     * 사이드바 오픈 여부
     */
    sidebarIsOpen: PropTypes.bool,
    /**
     * 사이드바 토글 버튼
     */
    onToggleSidebar: PropTypes.func,
};
const defaultProps = {
    sidebarIsOpen: false,
};

const Content = ({ children, sidebarIsOpen, onToggleSidebar }) => {
    return (
        <div id="right-panel" className={clsx('right-panel', { open: !sidebarIsOpen })}>
            <header id="header" className="header">
                <div className="header-menu">
                    <Col sm={7}>
                        <a id="menuToggle" className="menutoggle float-left" onClick={onToggleSidebar}>
                            <Icon icon={sidebarIsOpen ? faBars : faHandPointRight} />
                        </a>
                    </Col>
                </div>
            </header>
            {children}
        </div>
    );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
