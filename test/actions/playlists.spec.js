import expect from 'expect';
import * as actions from '../../scripts/actions/PlaylistsActions';
import * as types from '../../scripts/constants/ActionTypes';

describe('receiveSongs', () => {
    it('should create RECEIVE_SONGS action', () => {
        const entities = {users: {1: {name: 'Ain\'t Nobody'}, 2: {name: 'Firestone'}}}
        const songs = [1, 2];
        const playlist = 'kygo';
        expect(actions.receiveSongs(entities, songs, playlist)).toEqual({
          type: types.RECEIVE_SONGS,
          entities,
          futureUrl: undefined,
          nextUrl: undefined,
          playlist,
          songs
        });
    });
});
