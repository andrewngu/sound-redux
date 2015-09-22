import * as types from '../constants/ActionTypes';

function songs(state = {
    items: [],
}, action) {
    switch (action.type) {
    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            items: action.songs,
        });
    default:
        return state;
    }
}

export default songs;
