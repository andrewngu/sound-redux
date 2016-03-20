import * as types from '../constants/ActionTypes';

export default function modal(state = null, action) {
  switch (action.type) {
    case types.CHANGE_MODAL:
      return action.modal;
    default:
      return state;
  }
}
