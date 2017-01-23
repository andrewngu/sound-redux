import environment from '../../../utils/fixtures/environment/mobile';
import tech from './tech';

export default {
  reduxState: {
    ...tech.reduxState,
    environment,
  },
};
