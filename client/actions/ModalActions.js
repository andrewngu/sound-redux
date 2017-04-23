import * as types from '../constants/ActionTypes';

export function changeModal(modal) {
  return {
    type: types.CHANGE_MODAL,
    modal,
  };
}
