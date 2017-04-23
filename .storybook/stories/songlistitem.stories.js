import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/SongListItem';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import getSong from '../data/song';
import getUser from '../data/user';

const getSongListItem = ({userid = 1337, player: playerOverrides, ...overrides} = {}) => ({
    authed: {
      accessToken: null,
      followings: {},
      likes: {},
      newStreamSongs: [],
      playlists: [],
      user: null
    },
    isActive: false,
    playSong: () => {},
    dispatch: () => {},
    song: getSong({ user: userid, user_id: userid }),
    user: getUser({ user_id: userid }),
    player: {
      currentSongIndex: 3,
      currentTime: 42,
      isPlaying: false,
      selectedPlaylists: [],
      playerOverrides,
    },
    ...overrides,
})

storiesOf('SongListItem', module)
  .add('basic', () => {
    const props = getSongListItem();
    return (
      <Component { ...props }/>
    );
  })
  .add('is playing', () => {
    const props = getSongListItem({ player: { currentSongIndex: 0, isPlaying: true }, isActive: true });
    return (
      <Provider store={createStore(() => ({ player: {}}))}>
        <Component { ...props }/>
      </Provider>
    );
  });
