import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';

export function fetchSongs() {
    return dispatch => {
        return fetch(`http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&tags=house&limit=50&offset=0`)
            .then(response => response.json())
            .then(json => dispatch(receiveSongs(json)));
    };
}

export function receiveSongs(json) {
    return {
      type: types.RECEIVE_SONGS,
      songs: json.collection,
    };
}
