import * as types from '../constants/ActionTypes';

export default function songs(state={}, action) {
    switch(action.type) {
    case types.RECEIVE_SONG:
        return Object.assign({}, state, {
            [action.songId]: action.song
        });
    default:
        return state;
    }
}
