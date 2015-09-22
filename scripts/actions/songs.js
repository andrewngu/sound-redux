import * as types from '../constants/ActionTypes';
import {request} from '../helpers/Request';

export function fetchSongs() {
    request('http://soundcloud.com/whatever')
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}
