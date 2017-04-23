import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/Nav';

storiesOf('Nav', module)
  .add('basic', () => {
    const props = {
      authed: {
        accessToken: null,
        followings: {},
        likes: {},
        newStreamSongs: [],
        playlists: [],
        user: null
      },
      authedPlaylists: {},
      isMobile: false,
      navigator: {
        route: {
          path: [ "songs" ],
          query: {
            q: "tech",
            t: 7
          }
        }
      },
      dispatch: () => {},
      songs: {},
    };
    return (
      <Component { ...props }/>
    );
  });
