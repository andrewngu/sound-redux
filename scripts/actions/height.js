import * as types from '../constants/ActionTypes';

function changeHeight(height) {
    return {
        type: types.CHANGE_HEIGHT,
        height
    };
}

export function initHeight() {
    return dispatch => {
        dispatch(changeHeight(window.innerHeight));
        window.onresize = () => {
            dispatch(changeHeight(window.innerHeight));
        }
    }
}
