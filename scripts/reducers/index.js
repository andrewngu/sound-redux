import {combineReducers} from 'redux';
import height from '../reducers/height';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import {activePlaylist, playlists} from '../reducers/playlists';
import {activeSongId, songs} from '../reducers/songs';
import {activeUserId, users} from '../reducers/users';

const rootReducer = combineReducers({
    activePlaylist,
    activeSongId,
    activeUserId,
    height,
    navigator,
    player,
    playlists,
    songs,
    users
});

export default rootReducer;
