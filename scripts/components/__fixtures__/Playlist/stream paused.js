import playlists from '../../../utils/fixtures/playlists/stream';
import player from '../../../utils/fixtures/player/paused';
import songs from '../../../utils/fixtures/songs';

export default {
  player,
  playlists,
  songs,
  dispatch: (action) => console.log('dispatch', action),
};
