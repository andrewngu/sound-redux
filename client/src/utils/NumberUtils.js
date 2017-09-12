export const addCommas = (i) => {
  if (i === null || i === undefined) {
    return '';
  }

  return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const padZero = (num, size) => {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};

export const formatSeconds = (num) => {
  const minutes = padZero(Math.floor(num / 60), 2);
  const seconds = padZero(num % 60, 2);
  return `${minutes}:${seconds}`;
};
