import * as types from '../constants/ActionTypes';

export default function height(state = null, action) {
    switch(action.type) {
    case types.CHANGE_HEIGHT:
        return action.height;
    default:
        return state;
    }
}
