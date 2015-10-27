import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';

function authUser(accessToken) {
    console.log(accessToken);
    return {
        type: types.AUTH_USER,
        user
    };
}

export function loginUser() {
    return dispatch => {
        SC.initialize({
            client_id: CLIENT_ID,
            redirect_uri: `http://${window.location.host}/api/callback`
        });

        SC.connect().then(accessToken => dispatch(authUser(accessToken)))
        .catch(error => {
            throw error;
        });
    };
}
