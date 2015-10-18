import expect from 'expect';
import * as actions from '../../scripts/actions/player';
import * as types from '../../scripts/constants/ActionTypes';

describe('player actions', () => {
    it('changeCurrentTime should create CHANGE_CURRENT_TIME action', () => {
        const time = 200;
        expect(actions.changeCurrentTime(time)).toEqual({type: types.CHANGE_CURRENT_TIME, time});
    });

    it('changePlayingSong should create CHANGE_PLAYING_SONG action', () => {
        const songIndex = 10;
        expect(actions.changePlayingSong(songIndex)).toEqual({type: types.CHANGE_PLAYING_SONG, songIndex});
    });
});

describe('changeSelectedPlaylists action', () => {
    it('should add playlist if playlists are empty', () => {
        const playlists = [];
        const playlist = 'house';
        expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
            type: types.CHANGE_SELECTED_PLAYLISTS,
            playlists: ['house']
        });
    });

    it('should add playlist if playlists are not empty', () => {
        const playlists = ['trance', 'dubstep'];
        const playlist = 'house';
        expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
            type: types.CHANGE_SELECTED_PLAYLISTS,
            playlists: ['trance', 'dubstep', 'house']
        });
    });

    it('should move playlist to end if already in playlists', () => {
        const playlists = ['house', 'trance', 'dubstep'];
        const playlist = 'house';
        expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
            type: types.CHANGE_SELECTED_PLAYLISTS,
            playlists: ['trance', 'dubstep', 'house']
        });
    });
});
