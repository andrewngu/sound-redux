import player from '../../../utils/fixtures/player/playing';
import stopped from './stopped';

export default {
  ...stopped,
  isActive: true,
  player,
  // TogglePlayButtonContainer will be rendered and it needs the Redux context created
  reduxState: {},
};
