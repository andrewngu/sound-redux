export function constructUrl(route) {
    const {path, query} = route;
    let result = path.join('/');
    let queryArr = [];
    if (query && typeof query === 'object') {
        queryArr = Object.keys(query).sort().map(key => `${key}=${query[key]}`);
    }

    if (queryArr.length > 0) {
        result += '?' + queryArr.join('&');
    }

    return result;
}

export function parseUrl(windowHash) {
    let path = [];
    let query = {};
    const hashArr = windowHash.replace('#/', '').split('?');
    path = hashArr[0].split('/');

    if (hashArr.length > 1) {
        hashArr[1].split('&').forEach(str => {
            const arr = str.split('=');
            query[arr[0]] = arr[1];
        });
    }
    return {path, query};
}
