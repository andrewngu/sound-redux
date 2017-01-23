import songData from '../../../containers/__fixtures__/SongContainer/sample data';

const { authed, entities, environment, navigator, player, playlists } = songData.reduxState;
const { songs, users } = entities;
const { height } = environment;
const { path } = navigator.route;
const songId = Number(path[1]);
const playingSongId = null;

export default {
  authed,
  height,
  player,
  playingSongId,
  playlists,
  songId,
  songs,
  users,
  dispatch: (action) => console.log('dispatch', action),
};
