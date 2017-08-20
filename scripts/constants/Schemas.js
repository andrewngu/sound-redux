import { Schema, arrayOf } from 'normalizr';

const song = new Schema('songs');
const user = new Schema('users');
const playlist = new Schema('playlists');

song.define({
  user,
});

playlist.define({
  tracks: arrayOf(song),
});

export const songSchema = song;
export const playlistSchema = playlist;
export const userSchema = user;
