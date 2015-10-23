import { normalize, Schema, arrayOf } from 'normalizr';

let song = new Schema('songs');
let user = new Schema('users');

song.define({
    user: user
});

export const songSchema = song;
export const userSchema = user;
