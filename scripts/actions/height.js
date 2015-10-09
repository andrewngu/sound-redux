import * as types from '../constants/ActionTypes';

export function changeHeight(height) {
    return {
        type: types.CHANGE_HEIGHT,
        height: height
    };
}
