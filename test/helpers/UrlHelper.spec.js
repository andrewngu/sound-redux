import expect from 'expect';
import * as UrlHelper from '../../scripts/helpers/UrlHelper';

describe('UrlHelper', () => {
    describe('constructUrl', () => {
        it('should correctly construct a url', () => {
            const path = ['songs'];
            const query = {q: 'drake'};
            expect(UrlHelper.constructUrl(path, query)).toEqual('songs?q=drake');
        });
    });

    describe('parseUrl', () => {
        it('should correctly parse a window hash', () => {
            expect(UrlHelper.parseUrl('songs?q=drake')).toEqual({path: ['songs'], query: {q: 'drake'}});
        });
    });
});
