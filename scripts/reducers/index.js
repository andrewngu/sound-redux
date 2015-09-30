import {combineReducers} from 'redux';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import songs from '../reducers/songs';

const rootReducer = combineReducers({
    player,
    playlists,
    songs
});

export default rootReducer;
