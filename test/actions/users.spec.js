import expect from 'expect';
import nock from 'nock';
import * as actions from '../../scripts/actions/users';
import * as types from '../../scripts/constants/ActionTypes';

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
