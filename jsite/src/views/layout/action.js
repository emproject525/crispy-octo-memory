import { createAction } from 'redux-actions';

/** 사이드바 액션 */
const OPEN_SIDEBAR = 'layout/OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'layout/CLOSE_SIDEBAR';
const openSidebar = createAction(OPEN_SIDEBAR);
const closeSidebar = createAction(CLOSE_SIDEBAR);

export default {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    openSidebar,
    closeSidebar,
};
