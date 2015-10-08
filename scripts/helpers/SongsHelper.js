import {CLIENT_ID} from '../constants/Config';
import {GENRES_MAP} from '../constants/SongConstants';

export function constructUrl(category) {
    let result = `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=50&offset=0`;
    if (category in GENRES_MAP) {
        if (category !== 'house'
        && category !== 'trance'
        && category !== 'dubstep') {
            category = `${category} house`;
        }

        result += `&tags=${category}`;
    } else {
        result += `&q=${category}`;
    }

    return result;
}

export function constructSongUrl(songId) {
    return `http://api.soundcloud.com/tracks/${songId}?client_id=${CLIENT_ID}`;
}

export function getImageUrl(str) {
    if (!str) {
        return '';
    }

    return str.replace('large', 't300x300');
}
