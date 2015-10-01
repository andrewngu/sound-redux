import {addSongsToPlaylist} from '../actions/player';
import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

export function changeActivePlaylist(playlist) {
    return {
        type: types.CHANGE_ACTIVE_PLAYLIST,
        playlist: playlist
    };
}
