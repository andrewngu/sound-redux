import * as types from '../constants/ActionTypes';
import {callApi, Schemas} from '../middleware/api';

export function fetchSongs() {
    return callApi('http://soundcloud.com/whatever', Schemas.SONG);
}
