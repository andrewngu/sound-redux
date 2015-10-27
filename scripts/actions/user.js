import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';

function authUser(user) {
    console.log(user);
    return {
        type: types.AUTH_USER,
        user
    };
}

export function loginUser() {
    return dispatch => {
        SC.initialize({
            client_id: CLIENT_ID,
            redirect_uri: `http://${window.location.host}/callback`
        });

        SC.connect().then(function() {
            return SC.get('/me');
        }).then(user => dispatch(authUser(user)));
    };
}
