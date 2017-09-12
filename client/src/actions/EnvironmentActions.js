/* global window */
import * as types from '../constants/ActionTypes';

export const windowResize = (height, width) => ({
  type: types.WINDOW_RESIZE,
  height,
  width,
});

export const initEnvironment = () => (dispatch) => {
  dispatch(windowResize(window.innerHeight, window.innerWidth));

  window.onresize = () => {
    dispatch(windowResize(window.innerHeight, window.innerWidth));
  };
};
