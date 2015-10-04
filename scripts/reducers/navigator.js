import * as types from '../constants/ActionTypes';

export default function navigator(state={path: ['songs']}, action) {
    switch (action.type) {
    case types.NAVIGATE_TO:
        return Object.assign({}, state, {
            path: action.path
        });
    default:
        return state;
    }
}
