import expect from 'expect';
import * as actions from '../../scripts/actions/PlayerActions';
import * as types from '../../scripts/constants/ActionTypes';
import {CHANGE_TYPES} from '../../scripts/constants/SongConstants';
import {mockStore} from '../TestUtils';

describe('player actions', () => {
    describe('changeCurrentTime', () => {
        it('should create CHANGE_CURRENT_TIME action', () => {
            const time = 200;
            expect(actions.changeCurrentTime(time)).toEqual({type: types.CHANGE_CURRENT_TIME, time});
        });
    });

    describe('changePlayingSong', () => {
        it('should create CHANGE_PLAYING_SONG action', () => {
            const songIndex = 10;
            expect(actions.changePlayingSong(songIndex)).toEqual({type: types.CHANGE_PLAYING_SONG, songIndex});
        });
    });

    describe('changeSelectedPlaylists', () => {
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

    describe('changeSong', () => {
        it('should go to the next song if the change type is NEXT there are enough songs in the current playlist', (done) => {
            const prevStore = {
                player: {currentSongIndex: 0, selectedPlaylists: ['house']},
                playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
            };
            const expectedActions = [
                {type: types.CHANGE_PLAYING_SONG, songIndex: 1}
            ];
            const store = mockStore(prevStore, expectedActions, done);
            store.dispatch(actions.changeSong(CHANGE_TYPES.NEXT));
        });

        it('should not go to the next song if the change type is NEXT there are not enough songs in the current playlist', (done) => {
            const prevStore = {
                player: {currentSongIndex: 3, selectedPlaylists: ['house']},
                playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
            };
            const expectedActions = [];
            const store = mockStore(prevStore, expectedActions);
            store.dispatch(actions.changeSong(CHANGE_TYPES.NEXT));
            done();
        });

        it('should go to the previous song if the change type is PREV and the first song is not playing', (done) => {
            const prevStore = {
                player: {currentSongIndex: 3, selectedPlaylists: ['house']},
                playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
            };
            const expectedActions = [
                {type: types.CHANGE_PLAYING_SONG, songIndex: 2}
            ];
            const store = mockStore(prevStore, expectedActions, done);
            store.dispatch(actions.changeSong(CHANGE_TYPES.PREV));
        });

        it('should not go to the previous song if the change type is PREV and the first song is  playing', (done) => {
            const prevStore = {
                player: {currentSongIndex: 0, selectedPlaylists: ['house']},
                playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
            };
            const expectedActions = [];
            const store = mockStore(prevStore, expectedActions);
            store.dispatch(actions.changeSong(CHANGE_TYPES.PREV));
            done();
        });
    });

    describe('playSong', () => {
        const prevStore = {
            player: {
                currentSongIndex: null,
                selectedPlaylists: ['trance', 'dubstep']
            }
        };

        it('should create CHANGE_CURRENT_TIME, CHANGE_SELECTED_PLAYLISTS, CHANGE_PLAYING_SONG actions', (done) => {
            const expectedActions = [
                {type: types.CHANGE_CURRENT_TIME, time: 0},
                {type: types.CHANGE_SELECTED_PLAYLISTS, playlists: ['trance', 'dubstep', 'house']},
                {type: types.CHANGE_PLAYING_SONG, songIndex: 1}
            ];
            const store = mockStore(prevStore, expectedActions, done);
            store.dispatch(actions.playSong('house', 1));
        });
    });
});
