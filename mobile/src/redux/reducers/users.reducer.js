import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
} from '../constants';

const initialState = {loading: false, users: [], error: null};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // case GET_USER_INFO:
    //   return { ...state, loadingInfo: true };
    // case GET_USER_INFO_SUCCESS:
    //   return { ...state, loadingInfo: false, repoInfo: action.payload.data };
    // case GET_USER_INFO_FAIL:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     loadingInfo: false,
    //     errorInfo: 'Error getting repo info'
    //   };
    case GET_USER:
      return {...state, loading: false, user: action.user};

    default:
      return state;
  }
}
