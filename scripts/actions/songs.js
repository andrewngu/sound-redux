import * as types from '../constants/ActionTypes';

export function fetchSongs() {
    return {type: types.FETCH_SONGS};
}
