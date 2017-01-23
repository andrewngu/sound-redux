import authed from '../../../utils/fixtures/authed/authed';

export default {
  authed: {
    ...authed,
    newStreamSongs: [
      1,
      2,
      3,
      4,
    ],
  },
  dispatch: (action) => console.log('dispatch', action),
};
