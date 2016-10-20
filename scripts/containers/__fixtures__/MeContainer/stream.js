import reduxState from '../../../utils/fixtures/reduxState';
import navigator from '../../../utils/fixtures/navigator/me';
import playlists from '../../../utils/fixtures/playlists/stream';

export default {
  reduxState: {
    ...reduxState,
    navigator,
    playlists,
  },
};
