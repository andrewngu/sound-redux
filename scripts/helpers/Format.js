import {CLIENT_ID} from '../constants/Config';

export function formatSongTitle(s) {
    if (!s) {
        return '';
    }

    const arr = s.replace('–', '-').split(' - ');

    return arr[arr.length - 1].split(' (')[0];
}

export function formatStreamUrl(s) {
    return `${s}?client_id=${CLIENT_ID}`;
}
