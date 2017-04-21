import * as actions from '../../client/actions/NavigatorActions';
import * as types from '../../client/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('navigator actions', () => {
    describe('changePath', () => {
        it('should create CHANGE_PATH action', () => {
            const route = {path: ['songs'], query: {q: 'drake'}};
            expect(actions.changePath(route)).toEqual({type: types.CHANGE_PATH, route});
        });
    });
});
