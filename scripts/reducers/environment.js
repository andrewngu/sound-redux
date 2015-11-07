import * as types from '../constants/ActionTypes';

const initialState = {
    isMobile: false
};

export default function environment(state = initialState, action) {
    switch(action.type) {
    case types.CHANGE_IS_MOBILE:
        return Object.assign({}, state, {
            isMobile: action.isMobile
        });
    default:
        return state;
    }
}
