import * as types from '../constants/ActionTypes';

const initialToggleStatsState = {
    showStats: false,
};

export default function toggleStats(state = initialToggleStatsState, action) {
    switch (action.type) {
    case types.TOGGLE_STATS:
        return Object.assign({}, state, {
            showStats: !state.showStats,
        });
    default:
        return state;
    }
}
