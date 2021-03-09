import { createAction } from 'redux-actions';

/** 사이드바 액션 */
export const OPEN_SIDEBAR = 'layout/OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'layout/CLOSE_SIDEBAR';
export const openSidebar = createAction(OPEN_SIDEBAR);
export const closeSidebar = createAction(CLOSE_SIDEBAR);
