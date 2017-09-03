import { normalize } from 'normalizr';
import { fetchSongSuccess } from '../actions/PlaylistActions';
import { receiveSongs } from '../actions/PlaylistsActions';
import * as types from '../constants/ActionTypes';
import { SONG_URL } from '../constants/ApiConstants';
import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import {
  constructSongCommentsUrl,
  constructUserSongsUrl,
} from '../utils/SongUtils';
import callApi from '../utils/ApiUtils';

function fetchRelatedSongs(userId, songTitle) {
  return dispatch =>
    fetch(constructUserSongsUrl(userId))
      .then(response => response.json())
      .then(json => {
        const songs = json.filter(song => songTitle !== song.title);
        const normalized = normalize(songs, [songSchema]);
        dispatch(receiveSongs(
          normalized.entities,
          normalized.result,
          songTitle + SONG_PLAYLIST_SUFFIX,
          null
        ));
      })
      .catch(err => { throw err; });
}


const fetchSong = (id, playlist) => async (dispatch) => {
  const { json } = await callApi(SONG_URL.replace(':id', id));

  const { entities, result } = normalize(json, songSchema);
  dispatch(fetchSongSuccess(playlist, [result], entities, null, null));
};


const shouldFetchSong = (id, state) => {
  const { entities } = state;
  const { songs } = entities;
  const songExists = id in songs;
  const songHasWaveform = songExists ? songs[id].waveformUrl.indexOf('json') > -1 : null;

  return !songExists || !songHasWaveform;
};


export const fetchSongIfNeeded = (id, playlist) => (dispatch, getState) => {
  if (shouldFetchSong(id, getState())) {
    dispatch(fetchSong(id, playlist));
  }
};

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
