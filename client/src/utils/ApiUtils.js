/* global fetch */
/* global window */
import camelize from 'camelize';
import SC from 'soundcloud';

export const callApi = (url, options) =>
  fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));

export const loginToSoundCloud = (clientId) => {
  SC.initialize({
    client_id: clientId,
    redirect_uri: `${window.location.protocol}//${window.location.host}/api/callback`,
  });

  return SC.connect()
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }),
    )
    .catch(error => ({ error }));
};
