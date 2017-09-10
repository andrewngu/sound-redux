import IMAGE_SIZES from '../constants/ImageConstants';

const getImageUrl = (s, size = null) => {
  if (!s) {
    return '';
  }

  const url = s.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return url.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return url.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return url;
  }
};

export default getImageUrl;
