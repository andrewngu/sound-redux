import songsData from '../../../containers/__fixtures__/SongsContainer/tech';

const { authed, entities, environment, playlists } = songsData.reduxState;
const { height, isMobile } = environment;
const { songs, users } = entities;
const playingSongId = null;
const time = null;
const playlist = 'tech';

export default {
  authed,
  height,
  isMobile,
  playingSongId,
  playlist,
  playlists,
  songs,
  time,
  users,
  scrollFunc: () => console.log('scroll func'),
  dispatch: (action) => console.log('dispatch', action),
};
