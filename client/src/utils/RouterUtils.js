import pathRegexp, { compile } from 'path-to-regexp';

const compileOptions = options => Object.keys(options)
  .map(key => `${key}=${options[key]}`)
  .join('&');

export const compileHash = (route) => {
  const { path, keys, options } = route;

  const toPath = compile(path);
  const query = compileOptions(options);
  return `#/${toPath(keys)}${query === '' ? '' : `?${query}`}`;
};

const parseRouteKeys = (pathString, result) => {
  const { keys, regexp } = result;
  const regexpResult = regexp.exec(pathString);

  return keys.reduce((obj, key, i) => ({
    ...obj,
    [key.name]: i + 1 < regexpResult.length ? regexpResult[i + 1] : '',
  }), {});
};

const parseRouteOptions = optionsString => optionsString
  .split('&')
  .map(str => str.split('='))
  .filter(keyValuePair => keyValuePair.length === 2)
  .reduce((obj, keyValuePair) => ({
    ...obj,
    [keyValuePair[0]]: keyValuePair[1],
  }), {});

export const parseRoute = (hash, paths) => {
  const hashParts = hash.split('?');
  const pathString = hashParts[0];
  const optionsString = hashParts.length > 1 ? hashParts[1] : '';

  const result = paths
    .map((path) => {
      const keys = [];
      const regexp = pathRegexp(path, keys);

      return { path, regexp, keys };
    })
    .find(path => path.regexp.test(pathString));

  const path = result ? result.path : pathString;
  const keys = result ? parseRouteKeys(pathString, result) : {};
  const options = parseRouteOptions(optionsString);

  return { path, keys, options };
};
