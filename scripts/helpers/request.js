export function request(url) {
    return fetch(url)
    .then(response => {
        response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
    });
}
