import {FETCH_SONGS} from '../constants/ActionTypes';

function songs(state = {}, action) {
    switch (action.type) {
    case FETCH_SONGS:
        return state;
    }
    return state;
}

export default songs;
