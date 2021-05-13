import { appConstants } from '../constants';

export function app(state = {}, action) {
  switch (action.type) {
    case appConstants.LOADING:
      return {
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}
