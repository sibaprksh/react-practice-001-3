import { interviewConstants } from '../constants';

export function interview(state = {}, action) {
  switch (action.type) {
    case interviewConstants.CREATE_REQUEST:
      return {
        creating: true
      };
    case interviewConstants.CREATE_SUCCESS:
      return {
        interview: action.interview
      };
    case interviewConstants.CREATE_FAILURE:
      return {};
    case interviewConstants.FETCH_ALL_SUCCESS:
      return {
        interviews: action.interviews
      };
    case interviewConstants.LOADING:
      return {
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}
