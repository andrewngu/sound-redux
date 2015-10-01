import {CLIENT_ID} from '../constants/Config';
import {GENRES_MAP} from '../constants/Genres';

export function constructUrl(category) {
    if (category !== 'house'
    && category !== 'trance'
    && category !== 'dubstep') {
        category = `${category} house`;
    }

    let result = `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=50&offset=0`;
    if (category in GENRES_MAP) {
        result += `&tags=${category}`;
    } else {
        result += `&q=${category}`;
    }

    return result;
}
