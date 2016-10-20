import playerData from '../../../containers/__fixtures__/PlayerContainer/playing';

const { entities, environment, player, playlists } = playerData.reduxState;
const { isMobile } = environment;
const { songs, users } = entities;
const playingSongId = 275292567;

export default {
  isMobile,
  player,
  playingSongId,
  playlists,
  songs,
  users,
  dispatch: (action) => console.log('dispatch', action),
};
