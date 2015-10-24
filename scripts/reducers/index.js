import {combineReducers} from 'redux';
import entities from '../reducers/entities';
import height from '../reducers/height';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';

const rootReducer = combineReducers({
    entities,
    height,
    navigator,
    player,
    playlists,
});

export default rootReducer;
