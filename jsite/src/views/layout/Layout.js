import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, Content } from '@components';
import action from './action';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const sidebarIsOpen = useSelector(({ layout }) => layout.sidebarIsOpen);

    /**
     * 사이드바 토글 function
     */
    const onToggleSidebar = () =>
        sidebarIsOpen ? dispatch(action.closeSidebar()) : dispatch(action.openSidebar());

    return (
        <React.Fragment>
            {/* Left Panel */}
            <Sidebar sidebarIsOpen={sidebarIsOpen} />

            {/* Right Panel */}
            <Content sidebarIsOpen={sidebarIsOpen} onToggleSidebar={onToggleSidebar}>
                {children}
            </Content>
        </React.Fragment>
    );
};

export default Layout;
