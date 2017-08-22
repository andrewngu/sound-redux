import { connect } from 'react-redux';
import Song from '../components/Song';
import { getPlayingSongId } from '../utils/PlayerUtils';

function mapStateToProps(state) {
  const { authed, entities, environment, navigator, player, playlists } = state;
  const { songs, users } = entities;
  const { height } = environment;
  const { path } = navigator.route;
  const songId = Number(path[1]);

  const playingSongId = getPlayingSongId(player, playlists);

  return {
    authed,
    height,
    player,
    playingSongId,
    playlists,
    songId,
    songs,
    users,
  };
}

export default connect(mapStateToProps)(Song);
