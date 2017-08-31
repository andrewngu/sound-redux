import { CLIENT_ID } from '../constants/Config';

export function addCommas(i) {
  if (i === null || i === undefined) {
    return '';
  }

  return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatSongTitle(str) {
  if (!str) {
    return '';
  }

  const arr = str.replace('–', '-').split(' - ');

  return arr[arr.length - 1].split(' (')[0];
}

export function formatSeconds(num) {
  const minutes = padZero(Math.floor(num / 60), 2);
  const seconds = padZero(num % 60, 2);
  return `${minutes}:${seconds}`;
}

export function formatStreamUrl(str) {
  return `${str}?client_id=${CLIENT_ID}`;
}

export function getSocialIcon(service) {
  switch (service) {
    case 'facebook':
      return 'ion-social-facebook';
    case 'twitter':
      return 'ion-social-twitter';
    case 'instagram':
      return 'ion-social-instagram';
    case 'youtube':
      return 'ion-social-youtube';
    case 'hypem':
      return 'ion-heart';
    case 'google_plus':
      return 'ion-social-googleplus';
    case 'spotify':
      return 'ion-music-note';
    case 'songkick':
      return 'ion-music-note';
    case 'soundcloud':
      return 'ion-music-note';
    default:
      return 'ion-ios-world-outline';
  }
}

function padZero(num, size) {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}
