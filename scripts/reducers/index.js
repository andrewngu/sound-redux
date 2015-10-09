import {combineReducers} from 'redux';
import height from '../reducers/height';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import {activePlaylist, playlists} from '../reducers/playlists';
import {activeSongId, songs} from '../reducers/songs';

const rootReducer = combineReducers({
    activePlaylist,
    activeSongId,
    height,
    navigator,
    player,
    playlists,
    songs
});

export default rootReducer;
