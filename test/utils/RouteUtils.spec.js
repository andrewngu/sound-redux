import expect from 'expect';
import * as RouteUtils from '../../scripts/utils/RouteUtils';

describe('RouteUtils', () => {
    describe('constructUrl', () => {
        it('should correctly construct a url', () => {
            const route = {path: ['songs'], query: {q: 'drake'}};
            expect(RouteUtils.constructUrl(route)).toEqual('songs?q=drake');
        });
    });

    describe('parseUrl', () => {
        it('should correctly parse a window hash', () => {
            expect(RouteUtils.parseUrl('songs?q=drake')).toEqual({path: ['songs'], query: {q: 'drake'}});
        });
    });
});
