import userData from '../../../containers/__fixtures__/UserContainer/sample data';

const { authed, entities, environment, navigator, player, playlists } = userData.reduxState;
const { height } = environment;
const { songs, users } = entities;
const { path } = navigator.route;
const userId = Number(path[1]);
const playingSongId = null;

export default {
  authed,
  height,
  player,
  playingSongId,
  playlists,
  songs,
  userId,
  users,
  dispatch: (action) => console.log('dispatch', action),
};
