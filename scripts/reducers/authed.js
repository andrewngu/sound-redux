import * as types from '../constants/ActionTypes';

const initialState = {
    accessToken: null,
    playlists: [],
    user: null
};

export default function authed(state = initialState, action) {
    switch(action.type) {
    case types.RECEIVE_ACCESS_TOKEN:
        return Object.assign({}, state, {
            accessToken: action.accessToken
        });
    case types.RECEIVE_AUTHED_USER:
        return Object.assign({}, state, {
            user: action.user
        });
    case types.RECEIVE_AUTHED_PLAYLISTS:
        return Object.assign({}, state, {
            playlists: action.playlists
        });
    default:
        return state;
    }
}
