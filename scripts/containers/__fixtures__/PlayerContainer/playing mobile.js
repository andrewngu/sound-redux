import environment from '../../../utils/fixtures/environment/mobile';
import playing from './playing';

export default {
  reduxState: {
    ...playing.reduxState,
    environment,
  },
};
