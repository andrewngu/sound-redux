import authed from './authed/unauthed';
import environment from './environment/desktop';
import entities from './entities/songs-and-users';
import navigator from './navigator/songs';
import player from './player/stopped';
import playlists from './playlists/tech';

export default {
  authed,
  entities,
  environment,
  modal: null,
  navigator,
  player,
  playlists,
};
