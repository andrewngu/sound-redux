const API_HOSTNAME = '//api.soundcloud.com';
const CLIENT_ID = 'f4323c6f7c0cd73d2d786a2b1cdae80c';

const constructUrl = url => `${API_HOSTNAME}${url}&client_id=${CLIENT_ID}`;

export const SONG_URL = constructUrl('/tracks/:id');
export const SONGS_URL = constructUrl('/tracks?linked_partitioning=1&limit=50&offset=0');
