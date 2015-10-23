import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {arrayOf, normalize} from 'normalizr';
import merge from 'lodash/object/merge';
import * as actions from '../../scripts/actions/users';
import * as types from '../../scripts/constants/ActionTypes';
import {CLIENT_ID} from '../../scripts/constants/Config';
import {songSchema, userSchema} from '../../scripts/constants/Schemas';
import {mockStore} from '../TestUtils';

describe('users actions', () => {
    it('receiveSongs should create RECEIVE_SONGS action', () => {
        const entities = {users: {1: {name: 'Ain\'t Nobody'}, 2: {name: 'Firestone'}}}
        const songs = [1, 2];
        const playlist = 'kygo';
        expect(actions.receiveSongs(songs, entities, playlist)).toEqual({type: types.RECEIVE_SONGS, entities, nextUrl: null, songs, playlist});
    });

    it('receiveUserFollowings should create RECEIVE_USER_FOLLOWINGS action', () => {
        const entities = {
            users: {
                1: {
                    id: 1,
                    followings: [2, 3, 4]
                },
                2: {id: 2},
                3: {id: 3},
                4: {id: 4}
            }
        };
        expect(actions.receiveUserFollowings(entities)).toEqual({
            type: types.RECEIVE_USER_FOLLOWINGS,
            entities
        });
    });

    it('receiveUser should create RECEIVE_USER action', () => {
        const entities = {users: { 200: {id: 200, username: 'kygo'}}};
        expect(actions.receiveUser(entities)).toEqual({type: types.RECEIVE_USER, entities});
    });

    it('receiveUserProfiles should create RECEIVE_USER_PROFILES action', () => {
        const entities = {users: { 1: { profiles: [{service: 'facebook'}, {service: 'twitter'}]}}};
        expect(actions.receiveUserProfiles(entities)).toEqual({type: types.RECEIVE_USER_PROFILES, entities});
    });

    it('requestUser should create REQUEST_USER action', () => {
        const userId = 200;
        expect(actions.requestUser(userId)).toEqual({type: types.REQUEST_USER, userId});
    });
});

describe('fetchUser action', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('nothing happens if user is already loaded', (done) => {
        const expectedActions = [];
        const store = mockStore({entities: {users: {100: {id: 100, description: 'foo'}}}}, []);
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
            .get(`/users/${userId}?client_id=${CLIENT_ID}`)
            .reply(200, user);

        nock('http://api.soundcloud.com')
            .get(`/users/${userId}/tracks?client_id=${CLIENT_ID}`)
            .reply(200, songs);

        nock('http://api.soundcloud.com')
            .get(`/users/${userId}/followings?client_id=${CLIENT_ID}`)
            .reply(200, users);

        nock('http://api.soundcloud.com')
            .get(`/users/${userId}/web-profiles?client_id=${CLIENT_ID}`)
            .reply(200, profiles);

        const normalizedSongs = normalize(songs, arrayOf(songSchema));
        const normalizedFollowings = normalize(users, arrayOf(userSchema));
        const followingsEntities = merge({}, normalizedFollowings.entities, {
            users: {[userId]: {followings: normalizedFollowings.result}}
        });
        const profilesEntities = {users: {[userId]: { profiles: profiles}}};

        const expectedActions = [
            {type: types.REQUEST_USER, userId},
            {type: types.RECEIVE_USER, entities: normalize(user, userSchema).entities},
            {type: types.RECEIVE_SONGS, nextUrl: null, entities: normalizedSongs.entities, playlist: user.username, songs: normalizedSongs.result},
            {type: types.RECEIVE_USER_FOLLOWINGS, entities: followingsEntities},
            {type: types.RECEIVE_USER_PROFILES, entities: profilesEntities}
        ];

        const store = mockStore({entities: {users: {}}}, expectedActions, done);
        store.dispatch(actions.fetchUserIfNeeded(userId));
    });
});
