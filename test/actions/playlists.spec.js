import expect from 'expect';
import nock from 'nock';
import * as actions from '../../scripts/actions/playlists';
import * as types from '../../scripts/constants/ActionTypes';
import {constructUrl} from '../../scripts/helpers/SongsHelper';
import {mockStore} from '../TestUtils';

describe('changeActivePlaylist action', () => {
    it('should change the active playlist if the playlist has been loaded', (done) => {
        const playlist = 'house';
        const prevStore = {playlists: {house: {items: [{id: 0}]}}};
        const expectedActions = [
            {type: types.CHANGE_ACTIVE_PLAYLIST, playlist}
        ];
        const store = mockStore(prevStore, expectedActions, done);
        store.dispatch(actions.changeActivePlaylist(playlist));
    });

    it('should change the active playlist and fetch the playlist if it hasn\'t been loaded', (done) => {
        const playlist = 'house';
        const prevStore = {playlists: {}};
        const expectedActions = [
            {type: types.CHANGE_ACTIVE_PLAYLIST, playlist},
            {type: types.REQUEST_SONGS, playlist}
        ];
        const store = mockStore(prevStore, expectedActions, done);
        store.dispatch(actions.changeActivePlaylist('house'));
    });
});
