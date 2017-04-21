import * as actions from '../../client/actions/EnvironmentActions';
import * as types from '../../client/constants/ActionTypes';

describe('size actions', () => {
    describe('changeWidthAndHeight', () => {
        it('should create CHANGE_WIDTH_AND_HEIGHT action', () => {
            const height = 200;
            const width = 300;
            expect(actions.changeWidthAndHeight(height, width)).toEqual({
              type: types.CHANGE_WIDTH_AND_HEIGHT,
              height,
              width
            });
        });
    });
});
