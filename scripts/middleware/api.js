import {Schema, normalize} from 'normalizr';
import {camelizeKeys} from 'humps';
import 'isomorphic-fetch';

const songSchema = new Schema('songs', {
    idAttribute: 'id'
});

function callApi(url, schema) {
    return fetch(url)
    .then(response =>
        response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(json);
        }

        const camelizedJson = camelizeKeys(json);

        return Object.assign({},
            normalize(camelizedJson, schema);
        );
    });
}
