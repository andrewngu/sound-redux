import {combineReducers} from 'redux';
import activePlaylist from '../reducers/activePlaylist';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import {activeSongId, songs} from '../reducers/songs';

const rootReducer = combineReducers({
    activePlaylist,
    navigator,
    player,
    playlists,
    songs
});

export default rootReducer;
