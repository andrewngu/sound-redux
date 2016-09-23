import expect from 'expect';
import * as actions from '../../scripts/actions/NavigatorActions';
import * as types from '../../scripts/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('navigator actions', () => {
    describe('changePath', () => {
        it('should create CHANGE_PATH action', () => {
            const route = {path: ['songs'], query: {q: 'drake'}};
            expect(actions.changePath(route)).toEqual({type: types.CHANGE_PATH, route});
        });
    });
});
