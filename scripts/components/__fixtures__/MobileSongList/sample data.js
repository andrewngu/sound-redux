import playlists from '../../../utils/fixtures/playlists/tech';
import users from '../../../utils/fixtures/users';
import songs from '../../../utils/fixtures/songs';

export default {
  playingSongId: null,
  playlist: 'tech',
  playlists,
  songs,
  users,
  dispatch: (action) => console.log('dispatch', action),
};
