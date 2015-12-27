import { normalize, Schema, arrayOf } from 'normalizr';

let song = new Schema('songs');
let user = new Schema('users');
let playlist = new Schema('playlists');

song.define({
    user: user
});

playlist.define({
    tracks: arrayOf(song)
});

export const songSchema = song;
export const playlistSchema = playlist;
export const userSchema = user;
