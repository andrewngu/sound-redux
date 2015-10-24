import expect from 'expect';
import * as actions from '../../scripts/actions/height';
import * as types from '../../scripts/constants/ActionTypes';

describe('height actions', () => {
    describe('changeHeight', () => {
        it('should create CHANGE_HEIGHT action', () => {
            const height = 200;
            expect(actions.changeHeight(height)).toEqual({type: types.CHANGE_HEIGHT, height});
        });
    });
});
