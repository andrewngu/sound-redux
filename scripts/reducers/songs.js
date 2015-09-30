import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

const initialState = {
    activePlaylist: null,
};

export default function songs(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_PLAYLIST:
        return Object.assign({}, state, {
            activePlaylist: action.playlist
        });

    default:
        return state;
    }
}
