import {combineReducers} from 'redux';
import songs from  '../reducers/songs';

const rootReducer = combineReducers({
    songs
});

export default rootReducer;
