import {CLIENT_ID} from '../constants/Config';

function padZero(num, size) {
    let s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}

export function formatSongTitle(str) {
    if (!str) {
        return '';
    }

    const arr = str.replace('–', '-').split(' - ');

    return arr[arr.length - 1].split(' (')[0];
}

export function formatSeconds(num) {
    const minutes = padZero(Math.floor(num / 60), 2);
    const seconds = padZero(num % 60, 2);
    return `${minutes}:${seconds}`;
}

export function formatStreamUrl(str) {
    return `${str}?client_id=${CLIENT_ID}`;
}
