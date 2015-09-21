import * as types from '../constants/ActionTypes';
import {callApi, Schemas} from '../helpers/api';

export function fetchSongs() {
    return callApi('http://soundcloud.com/whatever', Schemas.SONG)
    .then(
        success => {
            console.log(success);
        },
        error => {
            console.log(error);
        }
    );
}
