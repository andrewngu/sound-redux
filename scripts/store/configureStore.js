import {createStore} from 'redux';
import appReducer from '../reducers/appReducer';

export default function configureStore(initialState) {
    const store = createStore(appReducer, initialState);

    return store;
}
