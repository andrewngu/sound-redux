import {combineReducers} from 'redux';
import songs from  './songs';

const appReducer = combineReducers({
    songs
});

export default appReducer;
