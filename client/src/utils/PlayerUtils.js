const volumeClassName = (volume) => {
  if (volume > 0.8) {
    return 'ion-android-volume-up';
  } else if (volume > 0) {
    return 'ion-android-volume-down';
  }

  return '';
};

export default volumeClassName;
