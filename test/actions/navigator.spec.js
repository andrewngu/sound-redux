import expect from 'expect';
import * as actions from '../../scripts/actions/navigator';
import * as types from '../../scripts/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('navigator actions', () => {
    it('changePath should create CHANGE_PATH action', () => {
        const path = ['songs'];
        expect(actions.changePath(path)).toEqual({type: types.CHANGE_PATH, path});
    });

    it('navigateTo should create CHANGE_PATH action if path is not user or song detail', (done) => {
        const path = ['tests'];
        const expectedActions = [{type: types.CHANGE_PATH, path}];
        const store = mockStore({}, expectedActions, done);
        store.dispatch(actions.navigateTo(path, false));
    });
});
