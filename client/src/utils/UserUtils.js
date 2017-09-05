import { CLIENT_ID } from '../constants/Config';

export function constructUserFollowingsUrl(userId) {
  return `//api.soundcloud.com/users/${userId}/followings?client_id=${CLIENT_ID}`;
}

export function constructUserProfilesUrl(userId) {
  return `//api.soundcloud.com/users/${userId}/web-profiles?client_id=${CLIENT_ID}`;
}

export function constructUserTracksUrl(userId) {
  return `//api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}

export function constructUserUrl(userId) {
  return `//api.soundcloud.com/users/${userId}?client_id=${CLIENT_ID}`;
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

export function getUserLocation(user) {
  if (user.city && user.country) {
    return `${user.city}, ${user.country}`;
  } else if (user.city) {
    return user.city;
  } else if (user.country) {
    return user.country;
  }

  return 'Earth';
}
