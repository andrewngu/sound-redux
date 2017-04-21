import { arrayOf, normalize } from 'normalizr';
import { receiveSongs } from '../actions/PlaylistsActions';
import * as types from '../constants/ActionTypes';
import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import {
  constructSongUrl,
  constructSongCommentsUrl,
  constructUserSongsUrl,
} from '../utils/SongUtils';

function fetchRelatedSongs(userId, songTitle) {
  return dispatch =>
    fetch(constructUserSongsUrl(userId))
      .then(response => response.json())
      .then(json => {
        const songs = json.filter(song => songTitle !== song.title);
        const normalized = normalize(songs, arrayOf(songSchema));
        dispatch(receiveSongs(
          normalized.entities,
          normalized.result,
          songTitle + SONG_PLAYLIST_SUFFIX,
          null
        ));
      })
      .catch(err => { throw err; });
}

export function fetchSongIfNeeded(songId) {
  return (dispatch, getState) => {
    const { entities, playlists } = getState();
    const { songs } = entities;
    if (!(songId in songs) || songs[songId].waveform_url.indexOf('json') > -1) {
      dispatch(fetchSong(songId));
    } else {
      const song = songs[songId];
      const songPlaylistKey = song.title + SONG_PLAYLIST_SUFFIX;
      if (!(songPlaylistKey in playlists)) {
        dispatch(receiveSongs({}, [songId], songPlaylistKey, null));
      }

      if (!('comments' in songs[songId])) {
        dispatch(fetchSongData(songId, song.user_id, song.title));
      }
    }
  };
}

function fetchSong(songId) {
  return dispatch => {
    dispatch(requestSong(songId));
    return fetch(constructSongUrl(songId))
      .then(response => response.json())
      .then(json => {
        const normalized = normalize(json, songSchema);
        dispatch(receiveSongPre(songId, normalized.entities));
      })
      .catch(err => { throw err; });
  };
}

function fetchSongComments(songId) {
  return dispatch =>
    fetch(constructSongCommentsUrl(songId))
      .then(response => response.json())
      .then(json => dispatch(receiveSongComments(songId, json)))
      .catch(err => { throw err; });
}

function fetchSongData(songId, userId, songTitle) {
  return dispatch => {
    dispatch(fetchRelatedSongs(userId, songTitle));
    dispatch(fetchSongComments(songId));
  };
}

export function receiveSong(entities) {
  return {
    type: types.RECEIVE_SONG,
    entities,
  };
}

function receiveSongComments(songId, comments) {
  return {
    type: types.RECEIVE_SONG_COMMENTS,
    entities: {
      songs: {
        [songId]: {
          comments,
        },
      },
    },
  };
}

function receiveSongPre(songId, entities) {
  return dispatch => {
    const songTitle = entities.songs[songId].title;
    const userId = entities.songs[songId].user_id;
    dispatch(receiveSong(entities));
    dispatch(receiveSongs(entities, [songId], songTitle + SONG_PLAYLIST_SUFFIX, null));
    dispatch(fetchSongData(songId, userId, songTitle));
  };
}

function requestSong(songId) {
  return {
    type: types.REQUEST_SONG,
    songId,
  };
}
