import {CLIENT_ID} from '../constants/Config';

export function constructUserUrl(userId) {
    return `http://api.soundcloud.com/users/${userId}?client_id=${CLIENT_ID}`;
}
