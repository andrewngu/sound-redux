import expect from 'expect';
import * as UrlHelper from '../../scripts/helpers/UrlHelper';

describe('UrlHelper', () => {
    describe('constructUrl', () => {
        it('should correctly construct a url', () => {
            const route = {path: ['songs'], query: {q: 'drake'}};
            expect(UrlHelper.constructUrl(route)).toEqual('songs?q=drake');
        });
    });

    describe('parseUrl', () => {
        it('should correctly parse a window hash', () => {
            expect(UrlHelper.parseUrl('songs?q=drake')).toEqual({path: ['songs'], query: {q: 'drake'}});
        });
    });
});
