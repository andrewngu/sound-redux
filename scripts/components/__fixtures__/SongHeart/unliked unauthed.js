import authed from '../../../utils/fixtures/authed/unauthed';

export default {
  authed,
  className: 'song-card-heart',
  isLiked: false,
  songId: 275292567,
  dispatch: (action) => console.log('dispatch', action),
};
