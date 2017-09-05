import { CLIENT_ID } from '../constants/Config';

const prepareStreamUrl = s => `${s}?client_id=${CLIENT_ID}`;

export const volumeClassName = (volume) => {
  if (volume > 0.8) {
    return 'ion-android-volume-up';
  } else if (volume > 0) {
    return 'ion-android-volume-down';
  }

  return '';
};

export default prepareStreamUrl;
