import SC from 'soundcloud';
import {navigateTo} from '../actions/navigator';
import {fetchSongs} from '../actions/playlists';
import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';


function authUser(accessToken) {
    return dispatch => {
        dispatch(receiveAccessToken(accessToken));
        dispatch(fetchAuthUser(accessToken));
        dispatch(fetchStream(accessToken));
        dispatch(navigateTo({path: ['me', 'stream']}));
    };
}

function fetchAuthUser(accessToken) {
    return dispatch => {
        return fetch(`http://api.soundcloud.com/me?oauth_token=${accessToken}`)
            .then(response => response.json())
            .then(json => receiveAuthUser(json))
            .catch(error => {throw error});
    };
}

function fetchStream(accessToken) {
    return dispatch => {
        dispatch(fetchSongs(`http://api.soundcloud.com/me/activities/tracks/affiliated?oauth_token=${accessToken}`, 'stream'));
    };
}

function receiveAccessToken(accessToken) {
    return {
        type: types.RECEIVE_ACCESS_TOKEN,
        accessToken
    };
}

function receiveAuthUser(user) {
    return {
        type: types.RECEIVE_AUTH_USER,
        user
    };
}

export function loginUser() {
    return dispatch => {
        SC.initialize({
            client_id: CLIENT_ID,
            redirect_uri: `http://${window.location.host}/api/callback`
        });

        SC.connect().then(authObj => dispatch(authUser(authObj.oauth_token)))
        .catch(error => {
            throw error;
        });
    };
}
