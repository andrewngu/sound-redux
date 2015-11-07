import * as types from '../constants/ActionTypes';

function changeIsMobile(isMobile) {
    return {
        type: types.CHANGE_IS_MOBILE,
        isMobile
    };
}

export function initEnvironment() {
    return dispatch => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        dispatch(changeIsMobile(isMobile));
    };
}
