import {combineReducers} from 'redux';
import player from '../reducers/player';
import songs from '../reducers/songs';

const rootReducer = combineReducers({
    player,
    songs
});

export default rootReducer;
