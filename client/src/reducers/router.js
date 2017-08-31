import { CHANGE_ROUTE } from '../constants/ActionTypes';

const initialRoute = {
  keys: {},
  options: {},
  path: '',
};

const initialState = {
  route: { ...initialRoute },
};

const router = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        route: action.route,
      };

    default:
      return state;
  }
};

export default router;
