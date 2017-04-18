import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(thunkMiddleware)
    ));

    return store;
}
