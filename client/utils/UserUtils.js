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
