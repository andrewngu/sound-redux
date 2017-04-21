jest.mock('global', () => ({
  fetch: jest.fn(url => Promise.resolve({
    json: () => {
      const tracks = [];
      const followings = {collection: []};
      const profiles =  [];

      const calls = {
        tracks: new RegExp('/users/100/tracks'),
        followings: new RegExp('/users/100/followings'),
        profiles: new RegExp('/users/100/web-profiles'),
      };
      const responses = { tracks, followings, profiles };

      if (url.match(calls.tracks)) {
        return Promise.resolve(responses.tracks);
      }
      if (url.match(calls.followings)) {
        return Promise.resolve(responses.followings);
      }
      if (url.match(calls.profiles)) {
        return Promise.resolve(responses.profiles);
      }
      return Promise.reject(new Error('unexpected fetch'));
    },
  })),
}));

import { fetch } from 'global';
import * as actions from '../../scripts/actions/UsersActions';
import * as types from '../../scripts/constants/ActionTypes';
import { mockStore } from '../TestUtils';

describe('users actions', () => {
    describe('fetchUserIfNeeded', () => {
        it('should not fetch if user is already loaded', async () => {
            const store = mockStore({entities: {users: {100: {id: 100, description: 'foo', followings: [2, 3, 4]}}}}, []);
            await store.dispatch(actions.fetchUserIfNeeded(100));
            expect(fetch).not.toHaveBeenCalled();
        });

        it('should not fetch if user is already loaded', async () => {
            const store = mockStore(
              { entities: { users: { 100: { id: 100, description: 'foo' }}}},
              [
                { entities: {}, futureUrl: undefined, nextUrl: null, playlist: 'undefined|user', songs: [], type: 'RECEIVE_SONGS' },
                { entities: { users: { 100: { followings: [] } } }, type: 'RECEIVE_USER_FOLLOWINGS' },
                { entities: { users: { 100: { profiles: [] } } }, type: 'RECEIVE_USER_PROFILES' }
              ]
            );
            await store.dispatch(actions.fetchUserIfNeeded(100));
            expect(fetch.mock.calls.map(i => i.join(','))).toMatchSnapshot();
        });
    });

    describe('receiveUserFollowings', () => {
        it('should create RECEIVE_USER_FOLLOWINGS action', () => {
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
    });

    describe('receiveUser', () => {
        it('should create RECEIVE_USER action', () => {
            const entities = {users: { 200: {id: 200, username: 'kygo'}}};
            expect(actions.receiveUser(entities)).toEqual({type: types.RECEIVE_USER, entities});
        });
    });

    describe('receiveUserProfiles', () => {
        it('should create RECEIVE_USER_PROFILES action', () => {
            const entities = {users: { 1: { profiles: [{service: 'facebook'}, {service: 'twitter'}]}}};
            expect(actions.receiveUserProfiles(entities)).toEqual({type: types.RECEIVE_USER_PROFILES, entities});
        });
    });

    describe('requestUser', () => {
        it('should create REQUEST_USER action', () => {
            const userId = 200;
            expect(actions.requestUser(userId)).toEqual({type: types.REQUEST_USER, userId});
        });
    });
});
