import md5 from 'md5';
import qs from 'qs';

const SHARED_SECRET = '0249dcf6654fb026ec15c791b82054c6';
const API_KEY = '0bcc3d6ae0d9b7481c52d427f133977b';

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function sign(params, secret) {
  return md5(Object.entries(params)
    .map(pair => pair.join(''))
    .sort()
    .join('') + secret);
}

export function scrobble(params) {
  const url = 'http://ws.audioscrobbler.com/2.0/';
  const defaultParams = {
    timestamp: getTimestamp(),
    sk: localStorage.LASTFM_SESSION_KEY,
    api_key: API_KEY,
    method: 'track.scrobble',
  };

  const paramsToSend = Object.assign(defaultParams, params);
  paramsToSend.api_sig = sign(paramsToSend, SHARED_SECRET);
  paramsToSend.format = 'json';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(paramsToSend),
  });
}

export function updateNowPlaying(params) {
  const url = 'http://ws.audioscrobbler.com/2.0/';
  const defaultParams = {
    sk: localStorage.LASTFM_SESSION_KEY,
    api_key: API_KEY,
    method: 'track.updateNowPlaying',
  };

  const paramsToSend = Object.assign(defaultParams, params);
  paramsToSend.api_sig = sign(paramsToSend, SHARED_SECRET);
  paramsToSend.format = 'json';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(paramsToSend),
  });
}

function session(params) {
  const url = 'http://ws.audioscrobbler.com/2.0/';
  const defaultParams = {
    api_key: API_KEY,
    method: 'auth.getSession',
  };

  const paramsToSend = Object.assign(defaultParams, params);
  paramsToSend.api_sig = sign(paramsToSend, SHARED_SECRET);
  paramsToSend.format = 'json';

  const paramsQuery = qs.stringify(paramsToSend, { addQueryPrefix: true });
  return fetch(url + paramsQuery)
    .then(response => response.json())
    .then(json => json.session);
}

function openDialog(url, width, height) {
  const params = {
    width,
    height,
    left: window.screenX + (window.outerWidth - width) / 2,
    top: window.screenY + (window.outerHeight - height) / 2,
  };

  const paramsStr = Object.entries(params).map(pair => pair.join('=')).join(', ');
  return window.open(url, 'Last.FM auth', paramsStr);
}

class LastFm {
  constructor() {
    this.resolveCallbackPromise = null;
    this.rejectCallbackPromise = null;
    const self = this;
    this.promise = new Promise((resolve, reject) => {
      self.resolveCallbackPromise = resolve;
      self.rejectCallbackPromise = reject;
    });
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(query) {
    const token = qs.parse(query, { ignoreQueryPrefix: true });
    if (token) {
      this.resolveCallbackPromise(token);
    } else {
      this.rejectCallbackPromise(`Error! Couldn't handle a callback: ${token}`);
    }
    this.dialog.close();
  }

  connect() {
    const callbackURL = `${window.location.protocol}//${window.location.host}/api/lastfm_callback`;
    const lastFmApiUrl = `http://www.last.fm/api/auth/?api_key=${API_KEY}&cb=${callbackURL}`;
    this.dialog = openDialog(lastFmApiUrl, 420, 670);
    return this.promise.then(token => session(token));
  }
}

export { LastFm };
