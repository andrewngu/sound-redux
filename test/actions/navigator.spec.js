import expect from 'expect';
import * as actions from '../../scripts/actions/navigator';
import * as types from '../../scripts/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('navigator actions', () => {
    it('changePath should create CHANGE_PATH action', () => {
        const path = ['songs'];
        const query = {q: 'dubstep'};
        expect(actions.changePath(path, query)).toEqual({type: types.CHANGE_PATH, path, query});
    });
});
