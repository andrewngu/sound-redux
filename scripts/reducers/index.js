import {combineReducers} from 'redux';
import activePlaylist from '../reducers/activePlaylist';
import activeSongId from '../reducers/activeSongId';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import songs from '../reducers/songs';

const rootReducer = combineReducers({
    activePlaylist,
    activeSongId,
    navigator,
    player,
    playlists,
    songs
});

export default rootReducer;
