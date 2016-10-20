import reduxState from '../../../utils/fixtures/reduxState';
import navigator from '../../../utils/fixtures/navigator/song';
import playlists from '../../../utils/fixtures/playlists/song';

export default {
  reduxState: {
    ...reduxState,
    navigator,
    playlists,
  },
};
