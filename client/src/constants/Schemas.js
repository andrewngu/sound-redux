import { schema } from 'normalizr';

const song = new schema.Entity('songs');
const user = new schema.Entity('users');
const playlist = new schema.Entity('playlists');

song.define({
  user,
});

playlist.define({
  tracks: [song],
});

export const songSchema = song;
export const playlistSchema = playlist;
export const userSchema = user;
