export const getLocation = (user) => {
  const { city, country } = user;

  if (city && country) {
    return `${city}, ${country}`;
  }

  if (city) {
    return city;
  }

  if (country) {
    return country;
  }

  return 'Earth';
};

export const getSocialIcon = (service) => {
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
};
