import {combineReducers} from 'redux';
import authed from '../reducers/authed';
import entities from '../reducers/entities';
import height from '../reducers/height';
import modal from '../reducers/modal';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';

const rootReducer = combineReducers({
    authed,
    entities,
    height,
    modal,
    navigator,
    player,
    playlists
});

export default rootReducer;
