import authed from '../../../utils/fixtures/authed/unauthed';
import player from '../../../utils/fixtures/player/stopped';
import users from '../../../utils/fixtures/users';
import songs from '../../../utils/fixtures/songs';

export default {
  authed,
  isActive: false,
  song: songs[275515537],
  user: users[10762173],
  player,
  playSong: () => console.log('play song'),
  dispatch: (action) => console.log('dispatch', action),
};
