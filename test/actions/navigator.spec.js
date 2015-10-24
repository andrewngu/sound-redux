import expect from 'expect';
import * as actions from '../../scripts/actions/navigator';
import * as types from '../../scripts/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('navigator actions', () => {
    it('changePath should create CHANGE_PATH action', () => {
        const route = {path: ['songs'], query: {q: 'drake'}};
        expect(actions.changePath(route)).toEqual({type: types.CHANGE_PATH, route});
    });
});
