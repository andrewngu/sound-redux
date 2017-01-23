import authed from '../../../utils/fixtures/authed/authed';
import playlists from '../../../utils/fixtures/playlists/default';

export default {
  authed: {
    ...authed,
    likes: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
  },
  playlists: {
    ...playlists,
    'likes|authed': {
      isFetching: false,
      items: [1, 2, 3, 4, 5, 6],
      nextUrl: null,
    },
  },
  dispatch: (action) => console.log('dispatch', action),
};
