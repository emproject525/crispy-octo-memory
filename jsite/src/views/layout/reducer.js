import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as action from './action';

/** initialState */
const initialState = {
    sidebarIsOpen: true,
};

/** action reducer */
export default handleActions(
    {
        [action.OPEN_SIDEBAR]: (state) => {
            return produce(state, (draft) => {
                draft.sidebarIsOpen = true;
            });
        },
        [action.CLOSE_SIDEBAR]: (state) => {
            return produce(state, (draft) => {
                draft.sidebarIsOpen = false;
            });
        },
    },
    initialState,
);
