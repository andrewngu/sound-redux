// entities selectors
export const getEntities = state => state.entities;

// router selectors
export const getGenre = state => state.router.route.options.g || 'house';
export const getSearch = state => state.router.route.options.q || '';
export const getTime = state => state.router.route.options.t || '';

// playlists selectors
export const getPlaylists = state => state.playlists;
