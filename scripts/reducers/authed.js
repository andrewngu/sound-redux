import * as types from '../constants/ActionTypes';

const initialState = {
    accessToken: null,
    likes: {},
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
    case types.RECEIVE_LIKES:
        return Object.assign({}, state, {
            likes: action.likes
        });
    case types.RESET_AUTHED:
        return Object.assign({}, state, initialState);
    case types.SET_LIKE:
        return Object.assign({}, state, {
            likes: Object.assign({}, state.likes, {
                [action.songId]: action.liked
            })
        });
    default:
        return state;
    }
}
