import {CLIENT_ID} from '../constants/Config';

export function constructUrl(category) {
    category = category.toLowerCase();
    return `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&tags=${category}&limit=50&offset=0`;
}
