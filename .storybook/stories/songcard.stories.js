import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/SongCard';
import getSong from '../data/song';
import getUser from '../data/user';

const getSongcard = (userid = 1337, ...overrides) => ({
    authed: {
      accessToken: null,
      followings: {},
      likes: {},
      newStreamSongs: [],
      playlists: [],
      user: null
    },
    isActive: false,
    song: getSong({ user: userid, user_id: userid }),
    user: getUser( { user_id: userid }),
    ...overrides,
})

storiesOf('Songcard', module)
  .add('basic', () => {
    const props = getSongcard();
    return (
      <Component { ...props }/>
    );
});
