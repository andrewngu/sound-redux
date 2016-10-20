import authed from '../../../utils/fixtures/authed/unauthed';
import navigator from '../../../utils/fixtures/navigator/songs';

export default {
  authed,
  authedPlaylists: {},
  isMobile: false,
  navigator: {
    route: {
      ...navigator.route,
      query: {
        q: 'slow life',
      },
    },
  },
  songs: {},
  dispatch: (action) => console.log('dispatch', action),
};
