import unauthed from './unauthed';
import users from '../users';

export default {
  ...unauthed,
  accessToken: '1-this-is-fake',
  followings: {},
  likes: {},
  user: {
    ...users[10762173],
    upload_seconds_left: 10779,
    quota: {
      unlimited_upload_quota: false,
      upload_seconds_used: 20,
      upload_seconds_left: 10779,
    },
    private_tracks_count: 0,
    private_playlists_count: 2,
    primary_email_confirmed: true,
    locale: '',
  },
};
