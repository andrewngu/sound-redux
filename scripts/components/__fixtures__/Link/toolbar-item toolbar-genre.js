import navigator from '../../../utils/fixtures/navigator/songs';

export default {
  className: 'toolbar-item toolbar-genre',
  route: {
    ...navigator.route,
    query: {
      q: 'progressive',
      t: null,
    },
  },
  children: 'progressive',
  dispatch: (action) => console.log('dispatch', action),
};
