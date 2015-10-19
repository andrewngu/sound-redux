import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import * as actions from '../../scripts/actions/users';
import * as types from '../../scripts/constants/ActionTypes';
import {mockStore} from '../TestUtils';

describe('users actions', () => {
    it('changeActiveUserId should create CHANGE_ACTIVE_USER_ID action', () => {
        const userId = 203;
        expect(actions.changeActiveUserId(userId)).toEqual({type: types.CHANGE_ACTIVE_USER_ID, userId});
    });

    it('receiveSongs should create RECEIVE_SONGS action', () => {
        const songs = [{id: 1}, {id: 2}];
        const playlist = 'kygo';
        expect(actions.receiveSongs(songs, playlist)).toEqual({type: types.RECEIVE_SONGS, nextUrl: null, songs, playlist});
    });

    it('receiveUserFollowings should create RECEIVE_USER_FOLLOWINGS action', () => {
        const userId = 200;
        const users = [{username: 'kygo'}, {username: 'avicii'}];
        expect(actions.receiveUserFollowings(userId, users)).toEqual({
            type: types.RECEIVE_USER_FOLLOWINGS,
            userId,
            users
        });
    });

    it('receiveUser should create RECEIVE_USER action', () => {
        const user = {id: 200, username: 'kygo'};
        expect(actions.receiveUser(user)).toEqual({type: types.RECEIVE_USER, userId: user.id, user});
    });

    it('receiveUserProfiles should create RECEIVE_USER_PROFILES action', () => {
        const userId = 200;
        const profiles = [{service: 'facebook'}, {service: 'twitter'}];
        expect(actions.receiveUserProfiles(userId, profiles)).toEqual({type: types.RECEIVE_USER_PROFILES, userId, profiles});
    });

    it('requestUser should create REQUEST_USER action', () => {
        const userId = 200;
        expect(actions.requestUser(userId)).toEqual({type: types.REQUEST_USER, userId});
    });
});

describe('fetchUser action', () => {
    it('nothing happens if user is already loaded', (done) => {
        const expectedActions = [];
        const store = mockStore({users: {100: {id: 100}}}, []);
        store.dispatch(actions.fetchUserIfNeeded(100));
        done();
    });

    it('creates REQUEST_USER, RECEIVE_USER, RECEIVE_SONGS, RECEIVE_USER_FOLLOWINGS, RECEIVE_USER_PROFILES if the user hasn\'t been loaded', (done) => {
        const userId = 100;
        const user = { id: 100, username: 'kygo'};
        const songs = [{id: 1}, {id: 2}];
        const users = [{id: 101}, {id: 102}];
        const profiles = [{id: 123}, {id: 124}];
        nock('http://api.soundcloud.com')
            .get(`/users/${userId}?client_id=e04b7b361da94b4b8e57cc42a80d7196`)
            .reply(200, user);

        nock('http://api.soundcloud.com')
            .get(`/users/${userId}/tracks?client_id=e04b7b361da94b4b8e57cc42a80d7196`)
            .reply(200, songs);

        nock('http://api.soundcloud.com')
            .get(`/users/100/followings?client_id=e04b7b361da94b4b8e57cc42a80d7196`)
            .reply(200, users);

        nock('http://api.soundcloud.com')
            .get(`/users/${userId}/web-profiles?client_id=e04b7b361da94b4b8e57cc42a80d7196`)
            .reply(200, profiles);

        const expectedActions = [
            {type: types.REQUEST_USER, userId},
            {type: types.RECEIVE_USER, user, userId: user.id},
            {type: types.RECEIVE_SONGS, nextUrl: null, playlist: user.username, songs},
            {type: types.RECEIVE_USER_FOLLOWINGS, userId, users},
            {type: types.RECEIVE_USER_PROFILES, userId, profiles}
        ];

        const store = mockStore({users: {}}, expectedActions, done);
        store.dispatch(actions.fetchUserIfNeeded(userId));
    });
});
