import reduxState from '../../../utils/fixtures/reduxState';
import navigator from '../../../utils/fixtures/navigator/user';
import playlists from '../../../utils/fixtures/playlists/user';

export default {
  reduxState: {
    ...reduxState,
    navigator,
    playlists,
  },
};
