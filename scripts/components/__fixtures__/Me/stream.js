import meData from '../../../containers/__fixtures__/MeContainer/stream';

const { authed, entities, environment, navigator, player, playlists } = meData.reduxState;
const { height, isMobile } = environment;
const { songs, users } = entities;
const { route } = navigator;
const playingSongId = null;

export default {
  authed,
  authedPlaylists: entities.playlists,
  height,
  isMobile,
  player,
  playingSongId,
  playlists,
  route,
  songs,
  users,
  dispatch: (action) => console.log('dispatch', action),
};
