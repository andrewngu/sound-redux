import authed from '../../../utils/fixtures/authed/unauthed';
import playlists from '../../../utils/fixtures/playlists/tech';
import users from '../../../utils/fixtures/users';
import songs from '../../../utils/fixtures/songs';

export default {
  authed,
  height: 480,
  playingSongId: null,
  playlist: 'tech',
  playlists,
  songs,
  users,
  scrollFunc: () => console.log('scroll func'),
  dispatch: (action) => console.log('dispatch', action),
};
