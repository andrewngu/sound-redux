import {FETCH_SONGS} from '../constants/ActionTypes';

const initialState = [];

export default function songs(state = initialState, action) {
    switch (action.type) {
    case FETCH_SONGS:
        return state;
    default:
        return state;
    }
}
