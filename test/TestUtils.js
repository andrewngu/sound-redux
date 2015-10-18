import expect from 'expect';
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];

export function mockStore(getState, expectedActions, onLastAction) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array');
    }

    if (onLastAction !== undefined && typeof onLastAction !== 'function') {
        throw new Error('onLastAction should be undefined or function');
    }

    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof getState === 'function' ? getState() : getState;
            },

            dispatch(action) {
                const expectedAction = expectedActions.shift();
                expect(action).toEqual(expectedAction);
                if (onLastAction && !expectedActions.length) {
                    onLastAction();
                }
                return action;
            }
        };
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware);

    return mockStoreWithMiddleware();
}
