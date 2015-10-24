
import * as types from '../constants/ActionTypes';

const initialState = {path: ['songs'], query: {q: 'house'}};

export default function navigator(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_PATH:
        return Object.assign({}, state, {
            path: action.path,
            query: action.query
        });
    default:
        return state;
    }
}
