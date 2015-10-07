import * as types from '../constants/ActionTypes';

const initialState = {path: [null]};

export default function navigator(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_PATH:
        return Object.assign({}, state, {
            path: action.path
        });
    default:
        return state;
    }
}
