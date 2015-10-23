const initialState = {
    songs: {},
    users: {}
};

export default function entities(state = initialState, action) {
    if (action.entities) {
        return Object.assign({}, state, action.entities);
    }

    return state;
}
