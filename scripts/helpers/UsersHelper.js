import {CLIENT_ID} from '../constants/Config';

export function constructUserUrl(userId) {
    return `http://api.soundcloud.com/users/${userId}?client_id=${CLIENT_ID}`;
}

export function constructUserTracksUrl(userId) {
    return `http://api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}
