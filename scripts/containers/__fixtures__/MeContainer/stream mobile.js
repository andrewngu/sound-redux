import environment from '../../../utils/fixtures/environment/mobile';
import stream from './stream';

export default {
  reduxState: {
    ...stream.reduxState,
    environment,
  },
};
