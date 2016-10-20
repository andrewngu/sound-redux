import reduxState from '../../../utils/fixtures/reduxState';
import player from '../../../utils/fixtures/player/playing';
import playlists from '../../../utils/fixtures/playlists/stream';

export default {
  reduxState: {
    ...reduxState,
    player,
    playlists,
  },
};
