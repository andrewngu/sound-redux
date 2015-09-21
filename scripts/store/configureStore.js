import {createStore} from 'redux';
import appReducer from '../reducers/appReducer';

export default function ConfigureStore(initialState) {
    const store = createStore(appReducer, initialState);

    return store;
}
