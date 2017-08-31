import moment from 'moment';
import { CLIENT_ID } from '../constants/Config';
import { GENRES_MAP, IMAGE_SIZES } from '../constants/SongConstants';

export function constructUrl(cat) {
  const catArr = cat.split(' - ');
  let category = catArr[0];
  let result = '//api.soundcloud.com/tracks?linked_partitioning=1&client_id=' +
    `${CLIENT_ID}&limit=50&offset=0`;

  if (category in GENRES_MAP) {
    if (category !== 'house'
    && category !== 'trance'
    && category !== 'dubstep') {
      category = `${category} house`;
    }

    result += `&tags=${category}`;
  } else {
    result += `&q=${category}`;
  }

  if (catArr.length > 1) {
    const formattedTime = moment().subtract(catArr[1], 'days').format('YYYY-MM-DD%2012:00:00');
    result += `&created_at[from]=${formattedTime}`;
  }

  return result;
}

export function constructSongCommentsUrl(songId) {
  return `//api.soundcloud.com/tracks/${songId}/comments?client_id=${CLIENT_ID}`;
}

export function constructSongUrl(songId) {
  return `//api.soundcloud.com/tracks/${songId}?client_id=${CLIENT_ID}`;
}

export function constructUserSongsUrl(userId) {
  return `//api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}

export function fetchWaveformData(waveformUrl) {
  return fetch(waveformUrl)
    .then(response => response.json())
    .then(json => json.samples)
    .catch(err => { throw err; });
}

export function getImageUrl(s, size = null) {
  let str = s;
  if (!str) {
    return '';
  }

  str = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return str.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return str.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return str;
  }
}
