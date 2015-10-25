import moment from 'moment';
import {CLIENT_ID} from '../constants/Config';
import {GENRES_MAP} from '../constants/SongConstants';

export function constructUrl(category) {
    const catArr = category.split(' - ');
    category = catArr[0];
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

    if (catArr.length > 1) {
        const formattedTime = moment().subtract(catArr[1], 'days').format('YYYY-MM-DD%2012:00:00');
        result += `&created_at[from]=${formattedTime}`;
    }

    return result;
}

export function constructSongCommentsUrl(songId) {
    return `http://api.soundcloud.com/tracks/${songId}/comments?client_id=${CLIENT_ID}`;
}

export function constructSongUrl(songId) {
    return `http://api.soundcloud.com/tracks/${songId}?client_id=${CLIENT_ID}`;
}

export function constructUserSongsUrl(userId) {
    return `http://api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}

export function getImageUrl(str) {
    if (!str) {
        return '';
    }

    return str.replace('large', 't300x300');
}
