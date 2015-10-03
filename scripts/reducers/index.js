import {combineReducers} from 'redux';
import activePlaylist from '../reducers/activePlaylist';
import player from '../reducers/player';
import playlists from '../reducers/playlists';

const rootReducer = combineReducers({
    activePlaylist,
    player,
    playlists
});

export default rootReducer;
