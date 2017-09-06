import { connect } from 'react-redux';
import User from '../components/User';
import { getPlayingSongId } from '../utils/PlayerUtils';

function mapStateToProps(state) {
  const { authed, entities, environment, navigator, player, playlists } = state;
  const { height } = environment;
  const { songs, users } = entities;
  const { path } = navigator.route;
  const userId = Number(path[1]);
  const playingSongId = getPlayingSongId(player, playlists);

  return {
    authed,
    height,
    player,
    playingSongId,
    playlists,
    songs,
    userId,
    users,
  };
}

export default connect(mapStateToProps)(User);
